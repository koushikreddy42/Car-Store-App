const express = require('express');
const router = express.Router();
const RegisterUser = require('../models/RegisterUserModel');
const gascarmodel = require('../models/GasCarModel');
const electriccarmodel = require('../models/ElectricCarModel');
const authMiddleware = require('../middleware/authMiddleware');
const mongoose = require('mongoose')

// Add to favorites
router.post('/add-favourite', authMiddleware,async (req, res) => {
  const { carId, carType } = req.body;
  const userId = req.user.id;
  try {
    const user = await RegisterUser.findById(userId);
    const existingFavorite = user.favourites.find(fav => 
      fav.car.toString() === carId && fav.carType === carType
    );

    if (!existingFavorite) {
      user.favourites.push({ car: carId, carType });
      await user.save();
    }

    res.json({ success: true, message: 'Added to favorites' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove from favorites
router.post('/remove-favourite',authMiddleware, async (req, res) => {
  const { carId } = req.body;
  const userId = req.user.id;

  try {
    const user = await RegisterUser.findById(userId);
    user.favourites = user.favourites.filter(fav => fav.car.toString() !== carId);
    await user.save();

    res.json({ success: true, message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's favorites
router.get('/favourites', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id;
  
      const user = await RegisterUser.findById(userId).populate({
        path: 'favourites.car'
      }); 
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({ success: true, favorites: user.favourites });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

module.exports = router;