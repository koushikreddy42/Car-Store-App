const express=require('express')
const router=express.Router()
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const registeruser= require('../models/RegisterUserModel')

router.route('/mail').post(
    async (req,res)=>{
        let testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: testAccount.user,
              pass: testAccount.pass,
            },
          });

          let message= {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          }

          transporter.sendMail(message).then((info)=>{
            return res.status(201).json({
                msg:"you should recieve an email",
                info:info.messageId,
                preview:nodemailer.getTestMessageUrl(info)
            })
          }).catch(error=>{
            return res.status(500).json({error})
          })

    }
)

router.route('/verify-email').get(async (req, res) => {
    try {
      const { token } = req.query;
      console.log(token)
      const user = await registeruser.findOne({ verificationToken: token });
  
      if (!user) {
        return res.status(400).send('Invalid or expired verification token');
      }
  
      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();
  
      res.status(200).send('Email verified successfully');
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  });


module.exports=router