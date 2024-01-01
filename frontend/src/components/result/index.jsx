import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function index() {
    const [result , setResult] = useState({})
    const info = useParams();
    useEffect(()=>{
        const res = async (e) => {
            await axios.get('/result')
        }
    },[])
  return (
    <div>index</div>
  )
}
