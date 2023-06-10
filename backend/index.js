const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv')
const auth=require('./routes/auth.js')
const hotel=require('./routes/hotels.js')
const app=express()
// middlewares
dotenv.config();
app.use(express.json())

// app.use((err,req,res,next)=>{
//   const errStatus=err.status||500
//   const errMessage=err.message||'Something went wrong!'
//   return res.status(errStatus).json({
//     success:false,
//     status:errStatus,
//     message:errMessage,
//     stack:err.stack,
//   })
// })

// connecting mongo 
const connect =async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('MONGODB connected')
      }
      catch(err){
        throw err;
      }
}
mongoose.connection.on('disconnected',()=>{
    console.log('MONGODB disconnected')
})

// calling routes 

// app.get('/test',(req,res)=>{
//     res.send('success')
// })

app.use('/auth',auth)
app.use('/hotels',hotel)
//listening request
app.listen(8000,()=>{
    connect()
    console.log('connected to backend')
})
