const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv')
const hotel=require('./routes/hotels.js')
const auth=require('./routes/auth.js');
const users=require('./routes/users.js')
const { errorHandler, notFound } = require('./utils/Error.js');
const cors=require('cors');
const connectDb = require('./config/db.js');
const cookieParser=require('cookie-parser')
const app=express()
// middlewares
dotenv.config();
app.use(express.json())
app.use(cors())
app.use(cookieParser())
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
connectDb()
// calling routes 

app.get('/test',(req,res)=>{
    res.send('success')
})

app.use('/auth',auth)
app.use('/hotels',hotel)
app.use('/users',auth)
app.use('/profile',users)
//error
app.use(notFound)
app.use(errorHandler)
//listening request
app.listen(8000,()=>{
    console.log('connected to backend')
})
