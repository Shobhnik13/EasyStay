const express=require('express')
const hotel = require('../models/hotelModel.js')
const createError = require('../utils/createError.js')
const router=express.Router()
//create-post
router.post('/',async(req,res)=>{
    const newHotel=new hotel(req.body)
    try{
    const saveHotel=await newHotel.save()
    res.status(200).json(saveHotel)
    }catch(error){
        res.status(500).json(error)
    }
})
//update-put
router.put('/:id',async(req,res)=>{
    try{
    const updateHotel=await hotel.findByIdAndUpdate(req.params.id, {$set:req.body} ,{new:true})
    res.status(200).json(updateHotel)
    }catch(error){
        res.status(500).json(error)
    }
})
//delete-delete
router.delete('/:id',async(req,res)=>{
    try{
        const Hotel=await hotel.findByIdAndDelete(req.params.id)
        res.status(200).json('Hotel deleted successfuly!')
    }catch(error){
        res.status(500).json(error)
    }
})
// get all-get 
router.get('/',async(req,res,next)=>{
    try{
        const Hotels=await hotel.find()
        res.status(200).json(Hotels)
    }catch(err){
        next(err)
    }
})
// get by id -get(:id)
router.get('/:id',async(req,res,next)=>{
    
    try{
        const Hotel=await hotel.findById(req.params.id)
        res.status(200).json(Hotel)
    }catch(err){
        next(err)
    }
})
module.exports=router