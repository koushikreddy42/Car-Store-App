const express = require('express')
const cors=require('cors')
const app=express();
const connectDB=require('./db/connect')
const carRouter = require('./routes/car_index');
const authRouter = require('./routes/auth')
const adminAuthRouter = require('./routes/admin_auth')
const mailRouter = require('./routes/mail')
const formRouter = require('./routes/form')
const mongoose=require('mongoose')

//middleware
app.use(cors());
app.use(express.json());


//routes
app.get('/',(req,res)=>{
    res.send('hello');
})
app.use('/api',authRouter,adminAuthRouter,carRouter,mailRouter,formRouter)

const port=8080;

const start=async ()=>{
    try {
        await connectDB()
        app.listen(port,()=>{
            console.log(`Server is running at port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

