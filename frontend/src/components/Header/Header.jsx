import React, { useState } from 'react'
import '../Header/Header.css'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from 'react-date-range';
import  {faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' 
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
const Header = ({type}) => {
  const [openDate,setOpenDate]=useState(false)
  const [destination,setDestination]=useState('')
  const [date,setDate]=useState(
    [
      {
      startDate:new Date(),
      endDate:new Date(),
      key:'selection'
      }
  ]
  )
  const [openOpt,setOpenOpt]=useState(false)
  const [opt,setOpt]=useState({
  adult:1,
    children:0,
    room:1,
  })
  const handleOption=(name,operation)=>{
    setOpt(prev=>{
      return{
        ...prev,
        [name]: operation==='i'? opt[name]+1:opt[name]-1,
      }
    })
  }
  const navigate=useNavigate()
  const handleSearch=()=>{
    navigate('/hotels',{state:{destination,date,opt}})
  }
  return (
    <div className='header bg-gradient-to-l from-blue-700 to-blue-400'>
        <div className={type==='list'?'headerContainerList':'headerContainer'}>
        <div className='headerList'>
            <div className='headerListName gap-2 active'>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
            </div>
            <div className='headerListName gap-2'>
            <FontAwesomeIcon icon={faPlane} />
            <Link to={'flights'}>Flights</Link>
            </div>
            <div className='headerListName gap-2'>
            <FontAwesomeIcon icon={faCar} />
            <Link to={'cars'}>Car rentals</Link>
            </div>
            <div className='headerListName gap-2'>
            <FontAwesomeIcon icon={faBed} />
            <Link to={'attractions'}>Attractions</Link>
            </div>
            <div className='headerListName gap-2'>
            <FontAwesomeIcon icon={faTaxi} />
            <Link to={'taxis'}>Airport taxis</Link>
            </div>
        </div>
      {type!=='list' &&  <> <h1 className='headerTitle font-bold text-3xl my-4'>Travel Made Simple:  <span className='text-blue-800 font-bold'>EasyStay</span> Booking Simplifies Hotel Reservations!</h1>
        <p className='headerDesc text-xl'>
        Experience luxury for less with EasyStay Booking. Unlock exclusive discounts on top-rated hotels, allowing you to enjoy a lavish stay without breaking the bank. 
        </p>
        <button className="headerBtn bg-blue-600">Sign in / Register</button>
        <div className="headerSearch border-[3px]  border-blue-600">
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faBed} className='headerIcon'/>
              <input type="text" placeholder='Where are you going?' name='destination' value={destination}  onChange={e=>setDestination(e.target.value)} className='headerSearchInput'/>
            </div>

            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
             <span onClick={()=>setOpenDate(!openDate)} className='headerSearchText'>{`${format(date[0].startDate,'MM/dd/yyyy')} to ${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
            {openDate && <DateRange
              editableDateInputs={true}
              onChange={item => setDate([item.selection])}
              minDate={new Date()}
              ranges={date}
              moveRangeOnFirstSelection={false}
              className='date'
              />}
            </div>

            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faPerson} className='headerIcon'/>
              <span onClick={()=>setOpenOpt(!openOpt)} className='headerSearchText'>{`${opt.adult} adult · ${opt.children} chldren · ${opt.room} room`}</span>
              {openOpt && <div className="options">
                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                  <button 
                  className="optionCounterButton" 
                  onClick={()=>handleOption('adult','d')}
                  disabled={opt.adult<2}
                  >-</button>
                  <span className='optionCounterNumber'>{opt.adult}</span>
                  <button className="optionCounterButton" onClick={()=>handleOption('adult','i')}>+</button>
                </div>
                </div>

                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                  <button 
                  className="optionCounterButton" 
                  onClick={()=>handleOption('children','d')}
                  disabled={opt.children<1}
                  >-</button>
                  <span className='optionCounterNumber'>{opt.children}</span>
                  <button 
                  className="optionCounterButton" onClick={()=>handleOption('children','i')}>+</button>
                </div>
                </div>

                <div className="optionItem">
                  <span className="optionText" >Room</span>
                <div className="optionCounter">
                  <button 
                  className="optionCounterButton" 
                  onClick={()=>handleOption('room','d')}
                  disabled={opt.room<2}
                  >-</button>
                  <span className='optionCounterNumber'>{opt.room}</span>
                  <button className="optionCounterButton" onClick={()=>handleOption('room','i')}>+</button>
                </div>
                </div>
              </div>}
            </div>

            <div className="headerSearchItem">
              <button className="headerBtn  bg-blue-600" onClick={handleSearch}>Search</button>
            </div>
        </div> </> }
        </div>
    </div>
  )
}

export default Header