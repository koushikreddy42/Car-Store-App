const express = require('express')
const router = express.Router()
const ElectricModel=require('../models/ElectricModel')
const GasModel=require('../models/GasModel')

router.route('/electric').get(async (req,res)=>{
    let electric_models = await ElectricModel.find();
    res.send(electric_models)
})

router.route('/gas').get(async (req,res)=>{
    let gas_models = await GasModel.find();
    res.send(gas_models)
})

module.exports=router 