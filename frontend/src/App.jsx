import React, {useState} from 'react';
import styles from './App.module.css';
import BookNow from './BookNow';

function App() {
  const [showText, setShowText] = useState(false);
 
  return (
    <div className={styles.app_container}>
      <nav className={styles.navbar}>
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
      </nav>
       <main className={styles.main_content}>
        <BookNow/>
        
      </main> 
      <footer className={styles.footer}>
        <div className={styles.footer_section}>
          <h3>About</h3>
          <p>Your ultimate destination for buying or renting high-quality vehicles. Find your perfect ride with us today!</p><br/>
          <div className={styles.social_icons}>
           <div className={styles.footer_icon}><a href="https://www.facebook.com/"><i class="fa-brands fa-square-facebook fa-2x"></i> </a></div>
           <div className={styles.footer_icon}><a href="https://x.com/"><i class="fa-brands fa-square-twitter fa-2x"></i> </a></div>
           <div className={styles.footer_icon}><a href="https://www.linkedin.com/"><i class="fa-brands fa-linkedin fa-2x"></i></a></div>
          </div>
        </div>
        <div className={styles.footer_section}>
          <h3>Important Links</h3>
          <span className={styles.footer_links}><a href="#home">Home</a></span><br/>
          <span className={styles.footer_links}><a href="#profile">Your Account</a></span><br/>
          <span className={styles.footer_links}><a href="#wishlist">Wishlist</a></span><br/>
          <span className={styles.footer_links}><a href="#faq">FAQ <i class="fa-solid fa-comment fa-sm"></i></a></span>
        </div>
        <div className={styles.footer_section}>
          <h3>Contact Info</h3>
          <p><i class="fa-solid fa-location-dot"></i>  Your address goes here - demo address</p>
          <p><i class="fa-solid fa-phone-flip"></i>  Phone : +123456789</p>
          <p><i class="fa-solid fa-envelope"></i>  Info@domain.com</p>
          <hr/>
        </div>
      </footer>
  
    </div>

  );
}
export default App;