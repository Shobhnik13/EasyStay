const jwt=require('jsonwebtoken')
const user = require('../models/userModel')
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}
module.exports=generateToken