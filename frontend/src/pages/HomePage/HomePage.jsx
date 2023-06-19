import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import Featured from '../../components/Featured/Featured'
import '../HomePage/HomePage.css'
import PropertyList from '../../components/PropertyList/PropertyList'
const HomePage = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <div className="homeContainer">
          <Featured/>
          <h1 className="homeTitle font-bold text-xl">Browse by property type</h1>
          <PropertyList/>
        </div>
    </div>
  )
}

export default HomePage