const express = require('express');
const router = express.Router();
const electriccarmodel = require('../models/ElectricCarModel');
const gascarmodel = require('../models/GasCarModel');
const registeruser = require('../models/RegisterUserModel');
const adminuser = require('../models/AdminUserModel')

router.route('/electric-form').post(async (req, res) => {
    try {
        const {
            image,
            title,
            year,
            price,
            topspeed,
            time60,
            range,
            colour,
            interior,
            wheel,
            description,
            rangedescription,
            technology,
            safety,
            performance,
            addedBy,
            isAdmin
        } = req.body;

        const newElectricCar = new electriccarmodel({
            image,
            title,
            year,
            price,
            topspeed,
            time60,
            range,
            colour,
            interior,
            wheel,
            description,
            rangedescription,
            technology,
            safety,
            performance,
            addedBy,
            isAdmin,
            isDisplayed: isAdmin
        });

        const savedElectricCar = await newElectricCar.save();

        // Update the user's addedCars array
        if (isAdmin) {
            // Find the admin user (assuming there's only one)
            const admin = await adminuser.findOne();
            if (admin) {
                // Update the admin's addedElectricCars array
                await adminuser.findByIdAndUpdate(
                    admin._id,
                    { $push: { addedElectricCars: savedElectricCar._id } },
                    { new: true }
                );
            }
        } else {
            // Update the regular user's addedCars array
            await registeruser.findByIdAndUpdate(
                addedBy,
                { $push: { addedElectricCars: savedElectricCar._id } },
                { new: true }
            );
        }

        res.json('Successfully uploaded car');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.route('/gas-form').post(async (req, res) => {
    try {
        const {
            image,
            addedBy,
            title,
            year,
            price,
            topspeed,
            time60,
            mileage,
            colour,
            engine,
            gearbox,
            transmission,
            interior,
            wheel,
            safety,
            technology,
            performance,
            cylinders,
            drivetrain,
            description,
            isAdmin 
        } = req.body;

        const newGasCar = new gascarmodel({
            image,
            addedBy,
            title,
            year,
            price,
            topspeed,
            time60,
            mileage,
            colour,
            engine,
            gearbox,
            transmission,
            interior,
            wheel,
            safety,
            technology,
            performance,
            cylinders,
            drivetrain,
            description,
            isAdmin,
            isDisplayed: isAdmin
        });

        const savedGasCar = await newGasCar.save();

        // Update the user's addedCars array
        if (isAdmin) {
            // Find the admin user (assuming there's only one)
            const admin = await adminuser.findOne();
            if (admin) {
                // Update the admin's addedElectricCars array
                await adminuser.findByIdAndUpdate(
                    admin._id,
                    { $push: { addedGasCars: savedGasCar._id } },
                    { new: true }
                );
            }
        } else {
            // Update the regular user's addedCars array
            await registeruser.findByIdAndUpdate(
                addedBy,
                { $push: { addedGasCars: savedGasCar._id } },
                { new: true }
            );
        }

        res.json('Successfully uploaded car');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.put('/edit-electric-car/:id', async (req, res) => {
    try {
      const updatedCar = await electriccarmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedCar);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

router.put('/edit-gas-car/:id',  async (req, res) => {
    try {
      const updatedCar = await gascarmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedCar);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.get('/get-electric-car/:id',  async (req, res) => {
    try {
      const car = await electriccarmodel.findById(req.params.id);
      if (!car) {
        return res.status(404).json({ message: 'Electric car not found' });
      }
      res.json(car);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/get-gas-car/:id',  async (req, res) => {
    try {
      const car = await gascarmodel.findById(req.params.id);
      if (!car) {
        return res.status(404).json({ message: 'Gas car not found' });
      }
      res.json(car);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  

module.exports = router;