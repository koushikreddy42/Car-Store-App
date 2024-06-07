const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://koushik:1234@cluster0.vyyeibe.mongodb.net/carStore?retryWrites=true&w=majority&appName=Cluster0'

const connectDB = (url)=>{
    mongoose.connect(connectionString)
    
}

module.exports=connectDB