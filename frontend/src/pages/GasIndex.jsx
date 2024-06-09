import React, { useState,useContext,useEffect } from 'react';
import { Header } from "../components/ElectricIndex/Header"
import SortAndCars from "../components/GasIndex/SortAndCars"
import { Navigate} from 'react-router-dom';
import axios from 'axios';
import { store } from '../App';

function GasIndex(){
    const [token,setToken]=useContext(store)
    const [data,setData]=useState(null)
    if(!token){
        return <Navigate to='/sign'/>
    }
    useEffect(()=>{
        axios.get('http://localhost:8080/api/myprofile',{
                headers:{
                    'x-token':token
                }
            }).then(res=>setData(res.data)).catch(err=>console.log(err))
    },[])
    return (
        <>
        {data && <Header username={data.username} />}
        <SortAndCars />
    </>
        
        
    )
}

export default GasIndex