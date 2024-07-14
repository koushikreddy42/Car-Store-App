const express = require('express')
const cors=require('cors')
const app=express();
const connectDB=require('./db/connect')
const carRouter = require('./routes/car_index');
const authRouter = require('./routes/auth')
const adminAuthRouter = require('./routes/admin_auth')
const mailRouter = require('./routes/mail')
const formRouter = require('./routes/form')
const listRouter = require('./routes/list')
const permissionRouter = require('./routes/permission')
const wishListRouter = require('./routes/wishlist')
const uploadRouter = require('./routes/buying_form')
const mongoose=require('mongoose')

//middleware
app.use(cors({
    origin: ["https://autozen-one.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));
app.use(express.json());
app.use("/files",express.static("files"))

//routes
app.get('/',(req,res)=>{
    res.send('hello');
})
app.use('/api',authRouter,adminAuthRouter,carRouter,mailRouter,formRouter,listRouter,permissionRouter,wishListRouter,uploadRouter)

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

