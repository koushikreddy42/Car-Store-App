import React, { useState } from "react";
import styles from "../components/Booking/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_section}>
        <h3>About</h3>
        <p>
          Your ultimate destination for buying or renting high-quality vehicles.
          Find your perfect ride with us today!
        </p>
        <br />
        <div className={styles.social_icons}>
          <div className={styles.footer_icon}>
            <a href="https://www.facebook.com/">
              <i class="fa-brands fa-square-facebook fa-2x"></i>{" "}
            </a>
          </div>
          <div className={styles.footer_icon}>
            <a href="https://x.com/">
              <i class="fa-brands fa-square-twitter fa-2x"></i>{" "}
            </a>
          </div>
          <div className={styles.footer_icon}>
            <a href="https://www.linkedin.com/">
              <i class="fa-brands fa-linkedin fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footer_section}>
        <h3>Important Links</h3>
        <div className={styles.footer_links}>
          <a href="#home">Home</a>
        </div>
        <br />
        <div className={styles.footer_links}>
          <a href="#profile">Your Account</a>
        </div>
        <br />
        <div className={styles.footer_links}>
          <a href="#wishlist">Wishlist</a>
        </div>
        <br />
        <div className={styles.footer_links}>
          <a href="#services">Services</a>
        </div>
        <br />
      </div>
      <div className={styles.footer_section}>
        <h3>Contact Info</h3>
        <p>
          <i class="fa-solid fa-location-dot"></i> Your address goes here - demo
          address
        </p>
        <p>
          <i class="fa-solid fa-phone-flip"></i> Phone : +123456789
        </p>
        <p>
          <i class="fa-solid fa-envelope"></i> Info@domain.com
        </p>
        <hr />
      </div>
    </footer>
  );
}
export default Footer;