import React, { useState } from 'react';
import styles from './User.module.css';
import { FaCar } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import logo from '../Assets/logo.png';

function User() {
    const [isOrderOpen, setOrderOpen] = useState(false);
    const openOrder = () => setOrderOpen(true);
    const closeOrder = () => setOrderOpen(false);

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <img className={styles.logo} src={logo} alt="Logo" />
                <div className={`${styles.orders} ${isOrderOpen ? styles.selected : ''}`} 
                 onClick={openOrder}>Orders</div>
                <div className={`${styles.sales} ${!isOrderOpen ? styles.selected : ''}`}  onClick={closeOrder}>Sell</div>
                <button className={styles.welcome}>Welcome User</button>
            </div>
            <div className={styles.details}>
                {isOrderOpen ? (
                    <div className={styles.orderDetails}>
                        
                        <h2>Order Details</h2>
                        <p>Here you can find your order details...</p>
                        

                    </div>
                ) : (
                    <div className={styles.salesDetails}>
                        {/* Code for sales */}
                        <h2>Sales</h2>
                        <p>Here you can find the sales information...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default User;
