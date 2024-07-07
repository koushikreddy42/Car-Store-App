const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')
require('../models/buyingform')
const mongoose = require('mongoose')
const buyingformschema = mongoose.model("buyingform")
require('../models/RegisterUserModel');
const RegisterUser = mongoose.model("registeruser");
const jwt = require('jsonwebtoken')
const ElectricCarModel = mongoose.model("electriccarmodel");
const GasCarModel = mongoose.model("gascarmodel");

// Create the 'files' directory if it doesn't exist
const uploadDir = './files' 
if (!fs.existsSync(uploadDir)) { 
    fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname)
    }
})
  
const upload = multer({ storage: storage })

router.post("/submit-form", upload.single("file"), async (req, res) => {
    console.log(req.file)
    const fileName = req.file ? req.file.filename : null;

    try {
        const formData = {
            ...req.body,
            pdf: fileName,
            electricCarId: req.body.carType === 'ev' ? req.body.carId : null,
            gasCarId: req.body.carType === 'gas' ? req.body.carId : null
        };
        
        await buyingformschema.create(formData);
        
        const { buyerId, carId, carType } = req.body;
        const updateField = carType === 'ev' ? 'electricCarOrders' : 'gasCarOrders';

        const userUpdate = await RegisterUser.findByIdAndUpdate(
            buyerId,
            { $push: { [updateField]: { car: carId, status: 'pending' } } },
            { new: true }
        );

        res.send({ status: "ok", formData, userUpdate });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});


router.get("/get-files",async (req,res)=>{
    try {
        buyingformschema.find({}).then(data=>{
            res.send({status:"ok",data:data})
        })
    } catch (error) {
        res.send({status:error})
    } 
}) 

router.get("/orders", async (req, res) => {
    const userId = req.headers['x-user-id'];

    if (!userId) {
        return res.status(400).json({ status: "error", message: "User ID is required" });
    }

    try {
        const user = await RegisterUser.findById(userId)
            .populate('electricCarOrders.car')
            .populate('gasCarOrders.car');

        if (!user) {
            console.error("User not found for userId:", userId);
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        const orders = {
            electricCarOrders: user.electricCarOrders || [],
            gasCarOrders: user.gasCarOrders || []
        };

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ status: "error", message: "Could not fetch orders" });
    }
});



router.get("/get-filess", async (req, res) => {
    try {
        const forms = await buyingformschema.find({});

        const populatedForms = await Promise.all(forms.map(async (form) => {
            let carDetails;
            if (form.carType === 'ev') {
                carDetails = await ElectricCarModel.findById(form.electricCarId);
            } else if (form.carType === 'gas') {
                carDetails = await GasCarModel.findById(form.gasCarId);
            }

            return {
                ...form.toObject(),
                carDetails: carDetails || null  // Attach car details to form data
            };
        }));

        res.send({ status: "ok", data: populatedForms });
    } catch (error) {
        console.error("Error fetching buying form data:", error);
        res.status(500).json({ status: "error", message: "Could not fetch buying form data" });
    }
});

router.post('/admin-cancel', async (req, res) => {
    const { buyerId, carType, carId, formId } = req.body;
  
    try {

        const form = await buyingformschema.findById(formId);

        if (!form) {
          return res.status(404).json({ message: 'Buying form not found' });
        }
    
        form.adminVerified = 'declined';
        await form.save();
    
      const user = await RegisterUser.findById(buyerId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Determine the type of car order to update
      if (carType === 'ev') {
        // Update electric car orders based on carId
        const electricOrder = user.electricCarOrders.find(order => order.car.toString() === carId);
        if (electricOrder && electricOrder.status === 'pending') {
          electricOrder.status = 'declined';
        } else {
          return res.status(404).json({ message: 'Electric car order not found or not pending' });
        }
      } else if (carType === 'gas') {
        const gasOrder = user.gasCarOrders.find(order => order.car.toString() === carId);
        if (gasOrder && gasOrder.status === 'pending') {
          gasOrder.status = 'declined';
        } else {
          return res.status(404).json({ message: 'Electric car order not found or not pending' });
        }
      } else {
        return res.status(400).json({ message: 'Invalid car type' });
      }
  
      await user.save();

      
  
      res.status(200).json({ message: 'Order canceled successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  router.post('/admin-accept', async (req, res) => {
    const { buyerId, carType, carId, formId, isAdmin } = req.body; 
  
    try {

      const form = await buyingformschema.findById(formId);
      if (!form) {
          return res.status(404).json({ message: 'Buying form not found' });
      }
      let carDetails;
      if (form.carType === 'ev') {
          carDetails = await ElectricCarModel.findById(form.electricCarId);
      } else if (form.carType === 'gas') {
          carDetails = await GasCarModel.findById(form.gasCarId);
      }
      if (!carDetails) {
          return res.status(404).json({ message: 'Car details not found' });
      }
      if (isAdmin) {
        form.adminVerified = 'accepted';
        form.ownerVerified = 'accepted';
        const user = await RegisterUser.findById(buyerId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Determine the type of car order to update
    if (carType === 'ev') {
      // Update electric car orders based on carId
      const electricOrder = user.electricCarOrders.find(order => order.car.toString() === carId);
      if (electricOrder && electricOrder.status === 'pending') {
        electricOrder.status = 'accepted';
      
      } else {
        return res.status(404).json({ message: 'Electric car order not found or not pending' });
      }
      const car = await ElectricCarModel.findById(carId);

      if (!car) {
      return res.status(404).json({ message: 'Electric Car not found' });
      }

      car.isSold = true;
      await car.save();
    } else if (carType === 'gas') {
      const gasOrder = user.gasCarOrders.find(order => order.car.toString() === carId);
      if (gasOrder && gasOrder.status === 'pending') {
        gasOrder.status = 'accepted';
      } else {
        return res.status(404).json({ message: 'Gas car order not found or not pending' });
      }
      const car = await GasCarModel.findById(carId);

      if (!car) {
      return res.status(404).json({ message: 'Gas Car not found' });
      }

      car.isSold = true;
      await car.save();
    } else {
      return res.status(400).json({ message: 'Invalid car type' });
    }

    await user.save();
    } else {
        form.adminVerified = 'accepted';
    }
      
      await form.save();
      
      if (!isAdmin) {
        const ownerId = carDetails.addedBy;
        const user = await RegisterUser.findById(ownerId);
    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.requestOrders.push(formId);
        await user.save();
    }
      res.status(200).json({ message: 'Order accepted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }); 

  router.get('/get-requests', async (req, res) => {
    const userId = req.query.userId;

    try {
        // Fetch the user by ID
        const user = await RegisterUser.findById(userId)
            .populate('requestOrders')
            .exec();

        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        // Get the request orders
        const requests = user.requestOrders;

        // Populate the car details for each request
        const populatedRequests = await Promise.all(requests.map(async (request) => {
            let carDetails;
            if (request.carType === 'ev') {
                carDetails = await ElectricCarModel.findById(request.electricCarId);
            } else if (request.carType === 'gas') {
                carDetails = await GasCarModel.findById(request.gasCarId);
            }

            return {
                ...request.toObject(),
                carDetails: carDetails || null  // Embed car details
            };
        }));

        // Send the populated requests
        res.json({ status: 'ok', data: populatedRequests });
    } catch (err) {
        console.error('Error fetching buying form data:', err);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

router.post('/owner-cancel', async (req, res) => {
  const { buyerId, carType, carId, formId } = req.body;

  try {

      const form = await buyingformschema.findById(formId);

      if (!form) {
        return res.status(404).json({ message: 'Buying form not found' });
      }
  
      form.ownerVerified = 'declined';
      await form.save();
  
    const user = await RegisterUser.findById(buyerId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Determine the type of car order to update
    if (carType === 'ev') {
      // Update electric car orders based on carId
      const electricOrder = user.electricCarOrders.find(order => order.car.toString() === carId);
      if (electricOrder && electricOrder.status === 'pending') {
        electricOrder.status = 'declined';
      } else {
        return res.status(404).json({ message: 'Electric car order not found or not pending' });
      }
    } else if (carType === 'gas') {
      const gasOrder = user.gasCarOrders.find(order => order.car.toString() === carId);
      if (gasOrder && gasOrder.status === 'pending') {
        gasOrder.status = 'declined';
      } else {
        return res.status(404).json({ message: 'Electric car order not found or not pending' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid car type' });
    }

    await user.save();

    

    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/owner-accept', async (req, res) => {
  const { buyerId, carType, carId, formId } = req.body;

  try {

      const form = await buyingformschema.findById(formId);

      if (!form) {
        return res.status(404).json({ message: 'Buying form not found' });
      }
  
      form.ownerVerified = 'accepted';
      await form.save();
  
    const user = await RegisterUser.findById(buyerId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Determine the type of car order to update
    if (carType === 'ev') {
      // Update electric car orders based on carId
      const electricOrder = user.electricCarOrders.find(order => order.car.toString() === carId);
      if (electricOrder && electricOrder.status === 'pending') {
        electricOrder.status = 'accepted';
      
      } else {
        return res.status(404).json({ message: 'Electric car order not found or not pending' });
      }
      const car = await ElectricCarModel.findById(carId);

      if (!car) {
      return res.status(404).json({ message: 'Electric Car not found' });
      }

      car.isSold = true;
      await car.save();
    } else if (carType === 'gas') {
      const gasOrder = user.gasCarOrders.find(order => order.car.toString() === carId);
      if (gasOrder && gasOrder.status === 'pending') {
        gasOrder.status = 'accepted';
      } else {
        return res.status(404).json({ message: 'Gas car order not found or not pending' });
      }
      const car = await GasCarModel.findById(carId);

      if (!car) {
      return res.status(404).json({ message: 'Gas Car not found' });
      }

      car.isSold = true;
      await car.save();
    } else {
      return res.status(400).json({ message: 'Invalid car type' });
    }

    await user.save();

    

    res.status(200).json({ message: 'Order accepted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router