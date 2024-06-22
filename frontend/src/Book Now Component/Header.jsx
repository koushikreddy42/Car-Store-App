
import React, { useState } from 'react';
import styles from './Header.module.css';

   function Header() {

    const [showText, setShowText] = useState(false);
     
    return (
      <section className={styles.navbar}>
        <div className={styles.logo}>
          <h1>AUTORIZZ</h1> 
        </div>
        <div className={styles.nav_buttons}>
          <button className={styles.nav_button}><i className="fa-solid fa-bolt"></i> EVs
          </button>
          <button className={styles.nav_button}><i className="fa-solid fa-fire-flame-simple"></i> Gas
          </button>
          <button className={styles.nav_button3}>Rental
          </button>
        </div>
        <div className={styles.icons}>
          <div className={styles.wl_icon}
            onMouseEnter={() => setShowText(true)}
            onMouseLeave={() => setShowText(false)}>
            <a href="#wishlist"><i className="fa-regular fa-heart fa-lg"></i></a>
             {showText && <span className={styles.wl_text}>Wishlist</span>}
          </div>
          <div className={styles.pf_icon}
            onMouseEnter={() => setShowText(true)}
            onMouseLeave={() => setShowText(false)}>
              <a href="#profile"><i className="fa-regular fa-circle-user fa-lg"></i></a>
             {showText && <span className={styles.pf_text}>Profile</span>}
          </div>
        </div>
      </section> 
    );
   } 
   export default Header;