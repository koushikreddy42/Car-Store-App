const express=require('express')
const router=express.Router()
const registeruser= require('../models/RegisterUserModel')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware/myprofile_middleware')
const crypto = require('crypto')
const sendVerificationEmail = require('../controllers/Mail');


function generateVerificationToken() { 
  return crypto.randomBytes(20).toString('hex');
}

router.route('/register').post(async (req,res)=>{
    try {
        const {username,email,password} = req.body;
        let exist = await registeruser.findOne({email})
        if(exist){
            return res.status(400).send('User Already Exists')
        }
        const verificationToken = generateVerificationToken();
        let newUser = new registeruser({
            username,
            email,
            password,
            verificationToken
        })
        await newUser.save();
        sendVerificationEmail(email, verificationToken);
        
        res.status(200).send('Registered Successfully! Please check your Email.')
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }
})


router.route('/login').post(async (req,res)=>{
    try {
        const {email,password} = req.body;
        let exist = await registeruser.findOne({email})
        if(!exist){
            return res.status(400).send('User Not Found')
        }
        if (!exist.isVerified) {
            return res.status(400).send('Please verify your email before logging in');
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

router.get('/myprofile',middleware,async(req,res)=>{
    try {
        let exist = await registeruser.findById(req.user.id);
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