const express = require('express');
const router = express.Router();
const electriccarmodel = require('../models/ElectricCarModel');
const gascarmodel = require('../models/GasCarModel');
const registeruser = require('../models/RegisterUserModel');

router.route('/gas-list/accept/:carId').put(async (req,res)=>{
    try {
        const { carId } = req.params;
        await gascarmodel.findByIdAndUpdate(carId, { isDisplayed: true });
        res.sendStatus(200);
      } catch (error) {
        console.error('Error accepting car:', error);
        res.sendStatus(500);
      }
})

router.route('/gas-list/decline/:carId').delete(async (req, res) => {
    try {
      const { carId } = req.params;
      const car = await gascarmodel.findByIdAndDelete(carId);
  
      // Remove the car from the user's addedGasCars array
      await registeruser.findByIdAndUpdate(car.addedBy, {
        $pull: { addedGasCars: carId }
      });
  
      res.sendStatus(200);
    } catch (error) {
      console.error('Error declining car:', error);
      res.sendStatus(500);
    }
})

router.route('/electric-list/accept/:carId').put(async (req,res)=>{
    try {
        const { carId } = req.params;
        await electriccarmodel.findByIdAndUpdate(carId, { isDisplayed: true });
        res.sendStatus(200);
      } catch (error) {
        console.error('Error accepting car:', error);
        res.sendStatus(500);
      }
})

router.route('/electric-list/decline/:carId').delete(async (req, res) => {
    try {
      const { carId } = req.params;
      const car = await electriccarmodel.findByIdAndDelete(carId);
  
      // Remove the car from the user's addedGasCars array
      await registeruser.findByIdAndUpdate(car.addedBy, {
        $pull: { addedElectricCars: carId }
      });
  
      res.sendStatus(200);
    } catch (error) {
      console.error('Error declining car:', error);
      res.sendStatus(500);
    }
})

module.exports=router