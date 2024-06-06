const express = require('express')
const router = express.Router()
const ElectricModel=require('../models/ElectricModel')

router.route('/').get(async (req,res)=>{
    let electric_models = await ElectricModel.find();
    res.send(electric_models)
})

module.exports=router