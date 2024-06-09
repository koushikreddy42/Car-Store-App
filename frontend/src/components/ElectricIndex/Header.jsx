import React from 'react'
import styles from './Header.module.css'
import logo from '../Assets/logo.png'
import {Link} from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
export const Header = (props) => {

  return (
    <div className={styles.header}>
        <div className={styles.header_logo}>
            <img src={logo} class={styles.logo_image} alt=""></img>
        </div>
        <div class={styles.category_div}>
        <Link to="/electric"><button class={styles.category_button}>EVs</button></Link>
        <Link to="/gas"><button class={styles.category_button}>Gas</button></Link>
        <button class={styles.category_button}>Rent</button>
        <button className={styles.category_button}>
        <FaShoppingCart className="cart-icon" style={{ color: 'white' }} />
        <span>Cart</span>
        </button>
        <button class={styles.category_button} style={{ color: 'red', border: '1px solid red'  }}>Logout</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', color: 'white',marginLeft:100 }}>
      <FaUser style={{ fontSize: '1.2em', marginRight: '10px', color: 'white' }} />
      <span style={{ fontSize: '1.2em', fontWeight: '500', color: 'white',fontFamily: 'Roboto, sans-serif' }}>Welcome {props.username}</span>
    </div>
    </div>
  )
}
