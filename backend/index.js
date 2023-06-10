const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv')
const auth=require('./routes/auth.js')
const app=express()
// middlewares
dotenv.config();

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

//listening request
app.listen(8000,()=>{
    connect()
    console.log('connected to backend')
})
