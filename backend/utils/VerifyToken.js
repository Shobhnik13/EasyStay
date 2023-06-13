const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
//verify token 
const verifyToken=asyncHandler((req,res,next)=>{
    const token=req.cookies.access_token
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                res.status(400)
                throw new Error('Not a valid token!')
            }
            else{
                req.user=user
                next()
            }
        })
    }
    else{
        res.status(400)
        throw new Error('You are not authenticated!')
    }
})
module.exports=verifyToken