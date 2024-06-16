const express = require('express');
const router = express.Router();
const electriccarmodel = require('../models/ElectricCarModel');
const gascarmodel = require('../models/GasCarModel');
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
            { $push: { addedElectricCars: savedElectricCar._id } },
            { new: true }
        );

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
            description,
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
            description,
        });

        const savedGasCar = await newGasCar.save();

        // Update the user's addedCars array
        await registeruser.findByIdAndUpdate(
            addedBy,
            { $push: { addedGasCars: savedGasCar._id } },
            { new: true }
        );

        res.json('Successfully uploaded car');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;