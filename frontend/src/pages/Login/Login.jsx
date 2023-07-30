import React, { useContext, useState } from 'react'
import '../Login/Login.css'
import { AuthContext, AuthContextProvider } from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [credentials,setCredentials]=useState({
        email:undefined,
        password:undefined,
    })
    const {user,dispatch,loading,err}=useContext(AuthContext)
    const handleChange=(e)=>{
        setCredentials((prev)=>({
            ...prev,
            [e.target.id]:e.target.value,
        }))
    }
    const navigate=useNavigate()
    const handleLogin=async(e)=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const response=await axios.post('http://localhost:8000/users/login',credentials)
            dispatch({type:"LOGIN_SUCCESS",payload:response.data})
            navigate('/')
        }catch(err){
            dispatch({type:"LOGIN_FAILED",payload:err.response.data})
        }
    }
    console.log(user)
  return (
    <div className='login'>
        <div className="lContainer">
            <input type="email" className='lInput'  name='email' id='email' placeholder='email' onChange={handleChange} />
            <input type="password" name="password" id="password" placeholder='password' onChange={handleChange} />
            <button disabled={loading} onClick={handleLogin} className="lButton">Login</button>
            {err && <span>{err.message}</span> }
        </div>    
    </div>
  )
}

export default Login