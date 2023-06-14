const express=require('express')
const user = require('../models/userModel.js')
const verifyToken = require('../utils/VerifyToken.js')
const verifyUser = require('../utils/VerifyUser.js')
const verifyAdmin = require('../utils/VerifyAdmin.js')
const router=express.Router()
// //check authentication
// router.get('/checkauth',verifyToken,(req,res)=>{
//     res.send('Hello ! You are logged in!')
// } )
// //check user
// router.get('/checkuser/:id',verifyUser,(req,res)=>{
//     res.send('You are logged in and can delete your account!')
// })
// //check admin
// router.get('/checkadmin/:id',verifyAdmin,(req,res)=>{
//     res.send('You are an admin and can delete all accounts!')
// })
//update-put
router.put('/:id',verifyUser,async(req,res)=>{
    try{
    const updateUser=await user.findByIdAndUpdate(req.params.id, {$set:req.body} ,{new:true})
    res.status(200).json(updateUser)
    }catch(error){
        res.status(500).json(error)
    }
})
//delete-delete
router.delete('/:id',verifyUser,async(req,res)=>{
    try{
        const User=await user.findByIdAndDelete(req.params.id)
        res.status(200).json('User deleted successfuly!')
    }catch(error){
        res.status(500).json(error)
    }
})
// get all-get 
router.get('/',verifyAdmin,async(req,res)=>{
    try{
        const Users=await user.find()
        res.status(200).json(Users)
    }catch(error){
        res.status(500).json(error)
    }
})
// get by id -get(:id)
router.get('/:id',verifyUser,async(req,res,next)=>{
    try{
        const User=await user.findById(req.params.id)
        res.status(200).json(User)
    }catch(error){
        res.status(500).json(error)
    }
})
module.exports=router