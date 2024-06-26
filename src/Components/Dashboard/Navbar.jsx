import React from 'react'
import * as FaIcons from 'react-icons/fa';
import { Link }  from 'react-router-dom';

function Navbar() {
  return (
    <div>
        <div className={styles.navbar}></div>
        <Link to='#' className={styles.menu-bars}>
            <FaIcons.FaBars />
        </Link>
    </div>
  )
}

export default Navbar