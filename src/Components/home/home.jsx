import React, { useState } from 'react';
import styles from './home.module.css'
import videoBg from '../Assets/bgvideo.mp4'
import logo from '../Assets/logo.png'

function Home(){
    return(
        
        
<div className={styles.homebody}>
<video className={styles.video} src={videoBg} autoPlay loop muted />
<div className={styles.content}>
    <div className={styles.navigate}>
        <img className={styles.logo} src={logo} />
        <div className={styles.support}>
            <div className={styles.help}>SERVICES</div>
            <div className={styles.help}>ABOUT</div>
            <div className={styles.help}>TEAM</div>
            <div className={styles.help}>CONTACT</div>
        </div>
    </div>
    <div className={styles.categories}>
       <button className={styles.category}>Electirc</button>
       <button className={styles.category}>Gas</button>
       <button className={styles.category}>Rent</button>
    </div>
    </div>
</div>

    );
}
export default Home;
