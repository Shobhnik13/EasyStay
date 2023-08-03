const express=require('express')
const hotel = require('../models/hotelModel.js')
const room = require('../models/roomModel.js')
const verifyAdmin = require('../utils/VerifyAdmin.js')
const router=express.Router()
// create 
router.post('/:hotelId',verifyAdmin,async(req,res,next)=>{
    const hotelId=req.params.hotelId
    const newRoom=new room(req.body)
    try{
        const savedRoom=await newRoom.save()
        try{
            await hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}})
        }catch(err){
            next(err)
        }
        res.status(200).json(savedRoom)
    }catch(err){
        next(err)
    } 
})
router.put('/availability/:id',async(req,res)=>{
    try{
        //here we will NOT USE findByIdAndUpdate bcoz we are not updating room props so no need of room id 
        //but hre we are updating the unavailable dates of roomNumbers so we only need the updateOne and we need individually roomNumbers id
        
        await room.updateOne({"roomNumbers._id":req.params.id},{
            $push:{
                "roomNumbers.$.unavailableDates":req.body.date
            }
        })
        res.status(200).json('updated')
    }catch(error){
        res.status(500).json(error)
    }
})
//delete-delete
router.delete('/:id/:hotelId',verifyAdmin,async(req,res)=>{
    const hotelId=req.params.hotelId
    try{
        await room.findByIdAndDelete(req.params.id)
        try{
            await hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
        }catch(err){
            next(err)
        }
        res.status(200).json('Room deleted successfuly!')
    }catch(error){
        res.status(500).json(error)
    }
})
// get all-get 
router.get('/',async(req,res)=>{
    try{
        const Rooms=await room.find()
        res.status(200).json(Rooms)
    }catch(error){
        res.status(500).json(error)
    }
})
// get by hotelid -get(:id)
router.get('/:id',async(req,res,next)=>{
    try{
        const Hotel=await hotel.findById(req.params.id)
        // as rooms is an array of room ids so promise all will fetch all and we wil map 
        const Rooms=await Promise.all(Hotel.rooms.map((Room)=>{
            return(
                room.findById(Room)
            )
        })) 
        res.status(200).json(Rooms)
    }catch(error){
        res.status(500).json(error)
    }
})
module.exports=router