const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const verifyToken = require('./VerifyToken');
//verify admin
const verifyAdmin=asyncHandler((req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin===true){
            next()
        }
        else{
            res.status(400)
            throw new Error('You are not an admin!')
        }
    })
})
module.exports=verifyAdmin