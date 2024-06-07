const express=require('express')
const router=express.Router()
const GasModel=require('../models/GasModel')

router.route('/').get(async (req,res)=>{
    let gas_models = await GasModel.find();
    res.send(gas_models)
})

module.exports=router