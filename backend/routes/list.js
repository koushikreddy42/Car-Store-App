const express = require('express');
const router = express.Router();
const electriccarmodel = require('../models/ElectricCarModel');
const gascarmodel = require('../models/GasCarModel');
const registeruser = require('../models/RegisterUserModel');

router.route('/gas-list').get(async (req, res) => {
    try {
      const gasCars = await gascarmodel.find().populate('addedBy','username').exec();
      res.send(gasCars);
    } catch (error) {
      console.error('Error retrieving gas car models:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
})

router.route('/gas-listt').get(async (req, res) => {
  try {
    const gasCars = await gascarmodel.find({ isDisplayed: true}).populate('addedBy','username').exec();
    res.send(gasCars);
  } catch (error) {
    console.error('Error retrieving gas car models:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.route('/electric-list').get(async (req, res) => {
    try {
      const gasCars = await electriccarmodel.find().populate('addedBy','username').exec();
      res.json(gasCars);
    } catch (error) {
      console.error('Error retrieving electric car models:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
})

router.route('/electric-listt').get(async (req, res) => {
  try {
    const gasCars = await electriccarmodel.find({ isDisplayed: true }).populate('addedBy','username').exec();
    res.json(gasCars);
  } catch (error) {
    console.error('Error retrieving electric car models:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

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