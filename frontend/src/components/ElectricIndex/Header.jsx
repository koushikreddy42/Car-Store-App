import React from 'react'
import styles from './Header.module.css'
import logo from '../Assets/t1.png'

export const Header = () => {

  return (
    <div className={styles.header}>
        <div className={styles.header_logo}>
            <img src={logo} class={styles.logo_image} alt=""></img>
        </div>
        <div class={styles.category_div}>
        <button class={styles.category_button}>EVs</button>
        <button class={styles.category_button}>Gas</button>
        <button class={styles.category_button}>Rent Cars</button>
        </div>
    </div>
  )
}
