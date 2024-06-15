const express = require('express');
const router = express.Router();
const electriccarmodel = require('../models/ElectricCarModel');
const registeruser = require('../models/RegisterUserModel');

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
            addedBy
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
            addedBy
        });

        const savedElectricCar = await newElectricCar.save();

        // Update the user's addedCars array
        await registeruser.findByIdAndUpdate(
            addedBy,
            { $push: { addedCars: savedElectricCar._id } },
            { new: true }
        );

        res.json('Successfully uploaded car');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;