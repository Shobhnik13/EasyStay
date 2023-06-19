import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import Featured from '../../components/Featured/Featured'
import '../HomePage/HomePage.css'
import PropertyList from '../../components/PropertyList/PropertyList'
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties'
const HomePage = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <div className="homeContainer">
          <Featured/>
          <h1 className="homeTitle font-bold text-xl">Browse by property type</h1>
          <PropertyList/>
          <h1 className='homeTitle font-bold text-xl'>Homes guests love</h1>
          <FeaturedProperties/>
        </div>
    </div>
  )
}

export default HomePage