const express = require('express')
const router = express.Router()
const ElectricModel=require('../models/ElectricModel')
const GasModel=require('../models/GasModel')
const RegisterUser = require('../models/RegisterUserModel')

router.route('/electric').get(async (req,res)=>{
    let electric_models = await ElectricModel.find();
    res.send(electric_models)
})

router.route('/gas').get(async (req,res)=>{
    let gas_models = await GasModel.find();
    res.send(gas_models)
})

router.route('/owner-cars').get(async (req, res) => {
    try {
        const userId = req.query.userId;
        const user = await RegisterUser.findById(userId)
            .populate('addedElectricCars')
            .populate('addedGasCars')
            .exec();

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log("User found:", user);
        res.json({
            electricCars: user.addedElectricCars,
            gasCars: user.addedGasCars
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching the cars' });
    }
});

module.exports=router 