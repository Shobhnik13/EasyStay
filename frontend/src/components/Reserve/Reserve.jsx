import React, { useContext, useState } from 'react'
import '../Reserve/Reserve.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Reserve = ({setRoomModal,hotelId}) => {
  const {loading,data,err}=useFetch(`http://localhost:8000/rooms/${hotelId}`)
  // console.log(data)
  const [selectedRooms,setSelectedRooms]=useState([])
  const selectRoom = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  // console.log(selectedRooms)

  const {date}=useContext(SearchContext)
  //for extracting and finalising all the dates
  const getDatesInRange=(startDate,endDate)=>{
    const start=new Date(startDate)
    const end=new Date(endDate)
    const date=new Date(start.getTime())
    //now loop over this  date until it reaches or < the end dte
    const list=[]
    while(date<=end){
      list.push(new Date(date).getTime())
      date.setDate(date.getDate()+1)
  }
  return list
  }
  const allDates=getDatesInRange(date[0].startDate,date[0].endDate)
  //to check if room is unavailabe or not
  const isAvailable=(rn)=>{
    //checks that if this room no is INCLUDED in SOME alldates in its unaivable dates array
    const isFound=rn.unavailableDates.some((date)=>allDates.includes(new Date(date).getTime()))
    //true -> so isFound means we cant book 
    return !isFound
  }
  const navigate=useNavigate()
  //for reserving
  const handleClick=async()=>{
    try{
      //as selectedrooms is an array so promise.all
      await Promise.all(selectedRooms.map((roomId)=>{
        //update the roomId
        const res=axios.put(`http://localhost:8000/rooms/availability/${roomId}`,{
          date:allDates,
        })
        return res.data
      }))
      navigate('/')
    }catch(err){

    }
  }
  return (
    <div className='reserve'>
      <div className="container">
        <FontAwesomeIcon 
        icon={faCircleXmark}
        className='rClose'
        onClick={()=>setRoomModal(false)}
        />
        <span>Select your rooms:</span>
        {data && data.map((item)=>{
          return(
            <div className="rItem">
              <div className="rIteminfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
                <div className="rPrice">{item.price}</div>
              </div>
                {/* as room number cn be multiple so make a mapping of select type  */}
                <div className='rSelectRooms'>
                {item.roomNumbers.map((rn)=>{
                  return(
                    <div className="room">
                    <label htmlFor="">{rn.number}</label>
                    <input type="checkbox" name="" value={rn._id} id="" onChange={selectRoom} disabled={!isAvailable(rn)} />
                  </div>
                  )
                })}
                </div>
            </div>
          )
        })}
        <button onClick={handleClick} className="rButton">Reserve Now!</button>
      </div>
    </div>
  )
}

export default Reserve