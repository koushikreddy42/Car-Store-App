const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')
require('../models/buyingform')
const mongoose = require('mongoose')
const buyingformschema = mongoose.model("buyingform")

// Create the 'files' directory if it doesn't exist
const uploadDir = './files'
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname)
    }
})
  
const upload = multer({ storage: storage })

router.post("/upload-files", upload.single("file"), async (req, res) => {
    console.log(req.file)
    const fileName = req.file.filename
    try {
        await buyingformschema.create({pdf:fileName});
        res.send({status:"ok"})
    } catch (error) {
        res.json({status:error})
    }
})

router.get("/get-files",async (req,res)=>{
    try {
        buyingformschema.find({}).then(data=>{
            res.send({status:"ok",data:data})
        })
    } catch (error) {
        res.send({status:error})
    }
})

module.exports = router