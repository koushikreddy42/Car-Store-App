const express = require('express');
const router = express.Router();
const electriccarmodel = require('../models/ElectricCarModel');
const gascarmodel = require('../models/GasCarModel');
const registeruser = require('../models/RegisterUserModel');

router.route('/gas-list').get(async (req, res) => {
  try {
    // Fetch only displayed cars
    let gasCars = await gascarmodel.find({ isDisplayed: false }).lean().exec();
    
    // Filter non-admin cars
    const nonAdminCars = gasCars.filter(car => !car.isAdmin);
    
    // Populate addedBy only for non-admin cars
    await gascarmodel.populate(nonAdminCars, {
      path: 'addedBy',
      select: 'username'
    });

    // Merge populated non-admin cars back into the main array
    gasCars = gasCars.map(car => 
      car.isAdmin ? car : nonAdminCars.find(c => c._id.equals(car._id))
    );

    res.send(gasCars);
  } catch (error) {
    console.error('Error retrieving gas car models:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.route('/gas-listt').get(async (req, res) => {
  try {
    // Fetch all displayed cars
    let gasCars = await gascarmodel.find({ isDisplayed: true }).lean().exec();
    
    // Filter non-admin cars
    const nonAdminCars = gasCars.filter(car => !car.isAdmin);
    
    // Populate addedBy only for non-admin cars
    await gascarmodel.populate(nonAdminCars, {
      path: 'addedBy',
      select: 'username'
    });

    // Merge populated non-admin cars back into the main array
    gasCars = gasCars.map(car => 
      car.isAdmin ? car : nonAdminCars.find(c => c._id.equals(car._id))
    );

    res.send(gasCars);
  } catch (error) {
    console.error('Error retrieving gas car models:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.route('/electric-list').get(async (req, res) => {
  try {
    // Fetch only displayed electric cars
    let electricCars = await electriccarmodel.find({ isDisplayed: false }).lean().exec();
    
    // Filter non-admin cars
    const nonAdminCars = electricCars.filter(car => !car.isAdmin);
    
    // Populate addedBy only for non-admin cars
    await electriccarmodel.populate(nonAdminCars, {
      path: 'addedBy',
      select: 'username'
    });

    // Merge populated non-admin cars back into the main array
    electricCars = electricCars.map(car => 
      car.isAdmin ? car : nonAdminCars.find(c => c._id.equals(car._id))
    );

    res.json(electricCars);
  } catch (error) {
    console.error('Error retrieving electric car models:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.route('/electric-listt').get(async (req, res) => {
  try {
    // Fetch all displayed electric cars
    let electricCars = await electriccarmodel.find({ isDisplayed: true }).lean().exec();
    
    // Filter non-admin cars
    const nonAdminCars = electricCars.filter(car => !car.isAdmin);
    
    // Populate addedBy only for non-admin cars
    await electriccarmodel.populate(nonAdminCars, {
      path: 'addedBy',
      select: 'username'
    });

    // Merge populated non-admin cars back into the main array
    electricCars = electricCars.map(car => 
      car.isAdmin ? car : nonAdminCars.find(c => c._id.equals(car._id))
    );

    res.json(electricCars);
  } catch (error) {
    console.error('Error retrieving electric car models:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/electric-listt/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Car ID is required' });
    }

    const car = await electriccarmodel.findById(id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/gas-listt/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Car ID is required' });
    }

    const car = await gascarmodel.findById(id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router