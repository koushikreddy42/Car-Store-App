const express = require('express')
const cors=require('cors')
const app=express();
const connectDB=require('./db/connect')
const electricRouter = require('./routes/electric_index');
const gasRouter = require('./routes/gas_index');
const mongoose=require('mongoose')

//middleware
app.use(cors());
app.use(express.json());

//routes
app.get('/',(req,res)=>{
    res.send('hello');
})
app.use('/api/electric',electricRouter)
app.use('/api/gas',gasRouter)

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

