const express=require('express')
const hotel = require('../models/hotelModel.js')
const verifyAdmin = require('../utils/VerifyAdmin.js')
const router=express.Router()
//create-post
router.post('/',verifyAdmin,async(req,res)=>{
    const newHotel=new hotel(req.body)
    try{
    const saveHotel=await newHotel.save()
    res.status(200).json(saveHotel)
    }catch(error){
        res.status(500).json(error)
    }
})
//update-put
router.put('/find/:id',verifyAdmin,async(req,res)=>{
    try{
    const updateHotel=await hotel.findByIdAndUpdate(req.params.id, {$set:req.body} ,{new:true})
    res.status(200).json(updateHotel)
    }catch(error){
        res.status(500).json(error)
    }
})
//delete-delete
router.delete('/find/:id',verifyAdmin,async(req,res)=>{
    try{
        const Hotel=await hotel.findByIdAndDelete(req.params.id)
        res.status(200).json('Hotel deleted successfuly!')
    }catch(error){
        res.status(500).json(error)
    }
})
// get all-get 
router.get('/',async(req,res)=>{
    try{
        const Hotels=await hotel.find()
        res.status(200).json(Hotels)
    }catch(error){
        res.status(500).json(error)
    }
})
// get by id -get(:id)
router.get('/find/:id',async(req,res,next)=>{
    try{
        const Hotel=await hotel.findById(req.params.id)
        res.status(200).json(Hotel)
    }catch(error){
        res.status(500).json(error)
    }
})

//count by city
router.get('/countByCity',async(req,res,next)=>{
    const cities=req.query.cities.split(',')
    try{
        // promise.all will help to map over all 3 cities 
        const list=await Promise.all(cities.map((city)=>{
            return(
                // countDocuments will return the no of hotels on base of city 
                hotel.countDocuments({city:city})
            )
        }))
        // const hotels=await hotel.find();
        res.status(200).json(list)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=router