import {useEffect, useState} from 'react'
import axios from 'axios'
const useFetch=(url)=>{
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [err,setErr]=useState(false)
        useEffect(()=>{

            const fetchData=async()=>{
                    setLoading(true)
                    try{
                        const res=await axios.get(url)
                        setData(res.data)
                    }catch(error){
                        setErr(error)
                    }
                    setLoading(false)
            }
            fetchData()
        },[])

        const reFetch=async()=>{
            setLoading(true)
            try{
                const res=await axios.get(url)
                setData(res.data)
            }catch(error){
                setErr(error)
            }
            setLoading(false)
        }
        return {data,err,loading,reFetch}
}
export default useFetch