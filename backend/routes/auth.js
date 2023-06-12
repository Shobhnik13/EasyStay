const express=require('express')
const user = require('../models/userModel')
const bcrypt=require('bcryptjs')
const notFound = require('../utils/Error.js')
const errorHandler=require('../utils/Error.js')
const asyncHandler=require('express-async-handler')
const generateToken = require('../utils/Token')
const router=express.Router()
// user registration 
router.post('/register',asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body
    const userExists=await user.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('user already exists!')
    }
       const newUser=await user.create({username,email,password})
        if(newUser){
            res.status(201).json({
                username:newUser.username,
                email:newUser.email,
            })
        }
        else{
            res.status(400)
            throw new Error('Error while creating user')
        }
}))

router.post('/login',asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const userExists=await user.findOne({email})
    if(userExists && (await userExists.matchPassword(password))){
        // return the data
        res.status(201).json({
            username:userExists.username,
            email:userExists.email,
            id:userExists.id,
        })
    }
    else{
        res.status(400)
        throw new Error('Email or Password is incorrect')
    }}))

module.exports=router