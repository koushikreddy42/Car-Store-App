const mongoose = require('mongoose')

const connectionString = 'mongodb://localhost:27017/carStore'

const connectDB = (url)=>{
    mongoose.connect(connectionString)
    
}

module.exports=connectDB