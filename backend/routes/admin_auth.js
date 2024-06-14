const express=require('express')
const router=express.Router()
const adminuser= require('../models/AdminUserModel')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware/myprofile_middleware')

router.route('/admin-login').post(async (req,res)=>{
    try {
        const {username,password} = req.body;
        let exist = await adminuser.findOne({username})
        if(!exist){
            return res.status(400).send('Invalid credentials')
        }
        if(exist.password!==password){
            return res.status(400).send('Invalid credentials')
        }
        let payload={
            user:{
                id : exist.id
            }
        }
        jwt.sign(payload,'noobmaster',{expiresIn:3600000},
            (err,token)=>{
                if(err) throw err;
                return res.json({token})
            }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }
})

router.get('/admin-myprofile',middleware,async(req,res)=>{
    try {
        let exist = await adminuser.findById(req.user.id);
        if(!exist) {
            return res.status(400).send('User not found')
        }
        res.json(exist)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server Error')
    }
})

module.exports = router