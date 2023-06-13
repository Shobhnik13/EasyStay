const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const verifyToken = require('./VerifyToken');
//verify user
const verifyUser=asyncHandler((req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id){
            next()
        }
        else{
            res.status(400)
            throw new Error('You are not authorized!')
        }
    })
})
module.exports=verifyUser