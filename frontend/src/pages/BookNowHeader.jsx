import React, { useState, useContext } from "react";
import styles from "../components/Booking/BookNowHeader.module.css";
import logo from "../components/Assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { store } from "../App";

export const BookNowHeader = (props) => {
  const [token, setToken] = useContext(store);
  const location = useLocation();

  return (
    <div className={styles.header}>
      <div className={styles.header_logo}>
        <img src={logo} className={styles.logo_image} alt="logo" />
      </div>
      <div className={styles.category_div}>
        <div className={styles.sub}>
          <Link to="/dashboard">
            <button className={styles.category_button}>Dashboard</button>
          </Link>
          <Link to="/wishlist">
            <button className={styles.category_button}>WishList</button>
          </Link>
        </div>
      </div>
      <div className={styles.new_div}>
        <button
          className={styles.logout_button}
          style={{ color: "red", border: "1px solid red" }}
          onClick={() => setToken(null)}
        >
          Logout
        </button>
        <div className={styles.user_section}>
          <FaUser className={styles.user_icon} />
          <span className={styles.user_text}>Welcome {props.username}</span>
        </div>
      </div>
    </div>
  );
};
