import React, { useState } from 'react'
import '../List/List.css'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns';
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/SearchItem/SearchItem'
import useFetch from '../../hooks/useFetch'
// import { options } from '../../../../backend/routes/hotels'
const List = () => {
  const location=useLocation()
  // console.log(location)
  const [destination,setDestination]=useState(location.state.destination)
  const [date,setDate]=useState(location.state.date)
  const [openDate,setOpenDate]=useState(false)
  const [opt,setOpt]=useState(location.state.opt)
  const [min,setMin]=useState(undefined)
  const [max,setMax]=useState(undefined)
  console.log(min,max)
  const {data,loading,err,reFetch}=useFetch(`http://localhost:8000/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)
  const handleClick=()=>{
    reFetch()
  }
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
                  <input type="text" placeholder={destination} />
                 </div>
                <div className="lsitem">
                  <label htmlFor="">Check-in-date</label>
                 <span  onClick={()=>setOpenDate(!openDate)} >{`${format(date[0].startDate,'MM/dd/yyyy')} to ${format(date[0].endDate,'MM/dd/yyyy')}`}</span>
                 {openDate&& 
                <DateRange
                  onChange={(item)=>setDate([item.selection])} minDate={new Date()} ranges={date}/>
                 }
                  </div>
                  <div className="lsitem">
                    <label htmlFor="">options</label>
                    <div className="lsoptions">
                    <div className="lsoptionitem">
                      <span className="lsoptiontext">Min price <small>per night</small></span>
                      <input className="lsoptionlayout"  placeholder='100' value={min} onChange={(e)=>setMin(e.target.value)}></input>
                    </div>

                    <div className="lsoptionitem">
                      <span className="lsoptiontext">Max price <small>per night</small></span>
                      <input className="lsoptionlayout"  value={max} onChange={(e)=>setMax(e.target.value)}  ></input>
                    </div>

                    <div className="lsoptionitem">
                      <span className="lsoptiontext">Adult</span>
                      <input className="lsoptionlayout" min={1} placeholder={opt.adult} type='number'></input>
                    </div>

                    <div className="lsoptionitem">
                      <span className="lsoptiontext">Children</span>
                      <input className="lsoptionlayout" min={0} placeholder={opt.children} type='number'></input>
                    </div>

                    <div className="lsoptionitem">
                      <span className="lsoptiontext">Room</span>
                      <input className="lsoptionlayout" min={1} type='number' placeholder={opt.room}></input>
                    </div>
                    </div>
                  </div>
                  <button onClick={handleClick}>Search</button>
          </div>
          <div className="listresult">
            {loading?('Loading data please wait!'):<>
                { data.length>=1 ? (data.map((item)=>{
                    return(
                    <SearchItem item={item} key={item._id}/>
                    )
                  })
                  ):(
                    'OOPS no results found!'
                  )
                }
              </>}
          </div>
        </div>

      </div>
    </div>
  )
}

export default List