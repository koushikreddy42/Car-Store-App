import React from 'react'
import styles from './Header.module.css'
import logo from '../Assets/t1.png'
import {Link} from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
export const Header = () => {

  return (
    <div className={styles.header}>
        <div className={styles.header_logo}>
            <img src={logo} class={styles.logo_image} alt=""></img>
        </div>
        <div class={styles.category_div}>
        <Link to="/electric"><button class={styles.category_button}>EVs</button></Link>
        <Link to="/gas"><button class={styles.category_button}>Gas</button></Link>
        <button class={styles.category_button}>Rent</button>
        </div>
        <button className={styles.category_button}>
        <FaShoppingCart className="cart-icon" style={{ color: 'white' }} />
        <span>Cart</span>
        </button>
        <button class={styles.logout_button}>Logout</button>
        <div style={{ display: 'flex', alignItems: 'center', color: 'white',marginLeft:80 }}>
      <FaUser style={{ fontSize: '1.2em', marginRight: '10px', color: 'white' }} />
      <span style={{ fontSize: '1.2em', fontWeight: '500', color: 'white',fontFamily: 'Roboto, sans-serif' }}>Welcome User</span>
    </div>
    </div>
  )
}
