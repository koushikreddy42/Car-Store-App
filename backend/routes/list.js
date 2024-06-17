const express = require('express');
const router = express.Router();
const electriccarmodel = require('../models/ElectricCarModel');
const gascarmodel = require('../models/GasCarModel');
const registeruser = require('../models/RegisterUserModel');

router.route('/gas-list').get(async (req, res) => {
    try {
      const gasCars = await gascarmodel.find({ isDisplayed: false }).populate('addedBy','username').exec();
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
      const gasCars = await electriccarmodel.find({ isDisplayed: false }).populate('addedBy','username').exec();
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


module.exports = router