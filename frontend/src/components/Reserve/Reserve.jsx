import React, { useState } from 'react'
import '../Reserve/Reserve.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
const Reserve = ({setRoomModal,hotelId}) => {
  const {loading,data,err}=useFetch(`http://localhost:8000/rooms/${hotelId}`)
  // console.log(data)
  const [selectedRooms,setSelectedRooms]=useState([])
  const selectRoom=(e)=>{
     const checked=e.target.checked
     const value=e.target.value
     
     setSelectedRooms(checked ? [...selectedRooms,value] : selectedRooms.filter(item=> item !== value
     ))
     console.log(selectedRooms)
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
            <div className="ritem">
              <div className="rIteminfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
                <div className="rPrice">{item.price}</div>
              </div>
                {/* as room number cn be multiple so make a mapping of select type  */}
                {item.roomNumbers.map((rn)=>{
                  return(
                    <div className="room">
                    <label htmlFor="">{rn.number}</label>
                    <input type="checkbox" name="" value={rn._id} id="" onChange={selectRoom} />
                  </div>
                  )
                })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Reserve