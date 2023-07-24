import React, { useState } from 'react'
import '../List/List.css'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns';
const List = () => {
  const location=useLocation()
  // console.log(location)
  const [destination,setDestination]=useState(location.state.destination)
  const [date,setDate]=useState(location.state.date)
  const [opt,setOpt]=useState(location.state.opt)
  return (
    <div>
      <Navbar/>
      <Header type='list'/>
      <div className="listcontainer">
        <div className="listwrapper">
          <div className='listsearch'>
              <h1 className="searchtit">Search</h1>
                <div className="lsitem">
                  <label htmlFor="">Destination</label>
                  <input type="text" />
                 </div>
                <div className="lsitem">
                  <label htmlFor="">Check-in-date</label>
                  <span>{`${format(date[0].startDate,'MM/dd/yyyy')} to ${format(date[0].endDate,'MM/dd/yyyy')}`}</span>
                </div>
          </div>
          <div className="listresult">

          </div>
        </div>

      </div>
    </div>
  )
}

export default List