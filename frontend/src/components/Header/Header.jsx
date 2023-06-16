import React from 'react'
import '../Header/Header.css'
import  {faBed, faCar, faPlane, faTaxi} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' 
const Header = () => {
  return (
    <div className='header bg-gradient-to-l from-blue-700 to-blue-400'>
        <div className='headerContainer'>
        <div className='headerList'>
            <div className='headerListName gap-2 active'>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
            </div>
            <div className='headerListName gap-2'>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
            </div>
            <div className='headerListName gap-2'>
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
            </div>
            <div className='headerListName gap-2'>
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
            </div>
            <div className='headerListName gap-2'>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
            </div>
        </div>
        <h1 className='headerTitle font-bold text-3xl my-4'>Travel Made Simple:  <span className='text-blue-800 font-bold'>EasyStay</span> Booking Simplifies Hotel Reservations!</h1>
        <p className='headerDesc text-xl'>
        Experience luxury for less with EasyStay Booking. Unlock exclusive discounts on top-rated hotels, allowing you to enjoy a lavish stay without breaking the bank. 
        </p>
        <button className="headerBtn bg-blue-600">Sign in / Register</button>
        </div>
    </div>
  )
}

export default Header