import React from 'react'
import './Header.css'
import logo from '../Assets/t1.png'

export const Header = () => {

  return (
    <div class="header">
        <div class="header-logo">
            <img src={logo} class="logo-image" alt=""></img>
        </div>
        <div class="category-div">
        <button class="category-button">EVs</button>
        <button class="category-button">Gas</button>
        <button class="category-button">Rent Cars</button>
        </div>
    </div>
  )
}
