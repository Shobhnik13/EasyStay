import React, { useContext, useState } from 'react'
import '../Hotel/Hotel.css'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import MailList from '../../components/EmailList/MailList'
import Footer from '../../components/Footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/Reserve/Reserve'
const Hotel = () => {
  const [slideno,setSlideNo]=useState(0);
  const [open,setOpen]=useState(false)
  const handleChange=(index)=>{
    setSlideNo(index)
    setOpen(true)
  }
  const handleSlide=(type)=>{
      let newSlideNo
      if(type==='l'){
        newSlideNo= slideno===0? 5 :slideno-1 
      }
      else{
        newSlideNo= slideno===5?0:slideno+1
      }
      setSlideNo(newSlideNo)
  }
  const [roomModal,setRoomModal]=useState(false)
  const location=useLocation()
  // console.log(location)
  //as we can not split the location directly bcoz its an object 
  //so we extract the pathname from location which is a String and contains the id
  //and we split the pathname string by ("/")[2]
  const id=location.pathname.split("/")[2]
  const {data,err,loading}=useFetch(`http://localhost:8000/hotels/find/${id}`)
  // console.log(data)
  //importing context
  const {date,opt}=useContext(SearchContext)
  // console.log(date)
  const MILLISEC_PERDAY=24*60*60*1000;
  const dayDiff=(date1,date2)=>{
    const timeDiff=Math.abs(date2.getTime() - date1.getTime())
    // console.log(timeDiff)
    // now time diff will be in mili secs 
    const diffDays=Math.ceil(timeDiff/MILLISEC_PERDAY)
    return diffDays
  }
  const days=dayDiff(date[0].endDate,date[0].startDate)
  const {user}=useContext(AuthContext)
  const navigate=useNavigate()
  const handleClick=()=>{
        if(user){
          setRoomModal(true);
        }
        else{
          navigate('/login')
        }
  }
  return (
    <div>
      <Navbar/>
      <Header type={'list'}/>
      {loading ?('Loading data please wait!'):
      (
      <><div className="hotelContainer">
       { open && <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={()=>setOpen(false)}/>
            <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={()=>handleSlide('l')}/>
            <div className="sliderWrapper">
              <img src={data.pictures[slideno]} className='sliderImg' alt="" />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={()=>handleSlide('r')}/>
            
        </div>}
        <div className="hotelWrapper">
          
          <button className='bookNow font-bold  bg-blue-600'>Reserve or Book Now!</button>

          <div className="hotelTitle">{data.name}</div>

          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>{data.address}</span>
          </div>

          <span className="hotelDistance text-blue-600">
            Excellent location - {data.distance} from  center
          </span>

          <span className='hotelPriceHighlight'>
            Book a stay over ${data.cheapestPrice} and get a free airport taxi!
          </span>

          <div className="hotelImages">
            {
              data.pictures?.map((i,index)=>{
                return(
                  <div className="hotelImgWrapper">
                        <img onClick={()=>handleChange(index)} src={i} alt="" className='hotelImg' />
                  </div>
                )
              })
            }
            </div>

            <div className="hotelDetails">
              <div className="hotelDeatilsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">
               {data.desc}
                </p>
              </div>

              <div className="hotelDetailsPrice">
              <h1 className='font-bold text-3xl'>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days*data.cheapestPrice*opt.room}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
        </div>
        <MailList/>
        <Footer/>
      </div></>)}
      {roomModal && <Reserve setRoomModal={setRoomModal} hotelId={id}/>}
    </div>
  )
}

export default Hotel