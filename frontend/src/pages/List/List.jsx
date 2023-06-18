import React from 'react'
import '../List/List.css'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
const List = () => {
  return (
    <div>
      <Navbar/>
      <Header type='list'/>
    </div>
  )
}

export default List