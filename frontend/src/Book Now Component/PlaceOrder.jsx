import React from 'react';
import styles from './PlaceOrder.module.css';

function PlaceOrder({ isOpen, onClose }){      
    if(!isOpen) return null;

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Handle form submission
    //     onClose();
    // };

    return(
   
    <div className={styles.modal} role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true">
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className ={styles.modalheads}><h3 className={styles.modalTitle} id="exampleModalLabel">Vehicle Order Form</h3>
            <p> Please fill in the form below to proceed. Thank you for choosing our services!</p></div>
            <button type="button" className={styles.closeButton} aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className={styles.modalBody}>
            <form>
              <div className={styles.formGroup}>
                <label className={styles.form_label}>Name: </label>
                <input type="text" className={styles.formControl3} id="username" placeholder="First Name" />
                <input type="text" className={styles.formControl3} id="username" placeholder="Last Name" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.form_label}>Email: </label>
                <input type="email" className={styles.formControl2} id="useremail" placeholder="name@gmail.com" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.form_label}>Phone:</label>
                <input type="tel" className={styles.formControl2} id="userphone" placeholder="91-xxxxxxxxxx" pattern="[0-9]{10}" required />
              </div>
              <div className={styles.formGroup2}>
                <div className={styles.line}><label className={styles.form_label}>Address:</label>
                  <input type="address" className={styles.formControl} id="useraddress" placeholder="House No." required />
                  <input type="address" className={styles.formControl} id="useraddress" placeholder="Street Address" required /></div>
                <div className={styles.line2}><input type="address" className={styles.formControl} id="useraddress" placeholder="City" required />
                  <input type="address" className={styles.formControl} id="useraddress" placeholder="Region" required /></div>
                <div className={styles.line2}><input type="address" className={styles.formControl} id="useraddress" placeholder="Postal/ Zip Code" required />
                  <input type="address" className={styles.formControl} id="useraddress" placeholder="State" required /></div>
              </div>
            </form>
          </div>
          <div className={styles.modalFooter}>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={onClose}>Close</button>
            <button type="submit" className={`${styles.btn} ${styles.btnSecondary}`}>Submit</button>
          </div>
        </div>
      </div>
    </div>
     
    );
}

export default PlaceOrder;