import React, { useState,useContext,useEffect } from 'react';
import { store } from '../App';
import styles from '../components/Home/Home.module.css'
import videoBg from '../components/Assets/bgvideo.mp4'
import logo from '../components/Assets/logo.png'
import { Navigate,Link } from 'react-router-dom';
import axios from 'axios';

function Home(){
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
        <div className={styles.homebody}>
          {data && (
            <>
              <video className={styles.video} src={videoBg} autoPlay loop muted />
              <div className={styles.content}>
                <div className={styles.navigate}>
                  <img className={styles.logo} src={logo} alt="logo" />
                  <div className={styles.support}>
                    <div className={styles.help}>SERVICES</div>
                    <div className={styles.help}>ABOUT</div>
                    <div className={styles.help}>TEAM</div>
                    <div className={styles.help}>CONTACT</div>
                  </div>
                </div>
                <div className={styles.categories}>
                <Link to="/electric"><button className={styles.category}>Electric</button></Link>
                <Link to="/gas"><button className={styles.category}>Gas</button></Link>
                  <button className={styles.category}>Rent</button>
                </div>
              </div>
            </>
          )}
        </div>
      );
}
export default Home;