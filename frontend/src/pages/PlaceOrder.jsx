import React, { useState, useRef } from 'react';
import styles from '../components/Booking/PlaceOrder.module.css';
import axios from 'axios';

function PlaceOrder({ isOpen, onClose, carType, buyerId, carId, isAdmin }) { 
    // const [isChecked, setIsChecked] = useState(false);
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        houseNo: '',
        streetAddress: '',
        city: '',   
        region: '',
        postalCode: '',
        state: '',
        comments: '', 
        file: null,
        carType: carType,
        buyerId: buyerId,
        carId: carId,
        isAdmin: isAdmin
    });

    const formRef = useRef(null);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    // if (!isOpen && !showSuccessDialog) return null;

    // const handleCheckboxChange = (event) => {
    //     setIsChecked(event.target.checked);
    //     setErrorMessage('');
    // };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleFileChange = (event) => {
        setFormData(prevState => ({
            ...prevState,
            file: event.target.files[0]
        }));
    };

    const submitForm = async (e) => {
        e.preventDefault();
        
        if (!formRef.current) return;

        if (!formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }

        const submitData = new FormData();
        for (const key in formData) {
            submitData.append(key, formData[key]);
        }
        try {
            const result = await axios.post('http://localhost:8080/api/submit-form', submitData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(result);
            setShowSuccessDialog(true);
            setTimeout(() => setShowSuccessDialog(false),5000);
            onClose();
            
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const SuccessDialog = () => (
        <div className={`${styles.successDialog} ${showSuccessDialog ? styles.show : ''}`}>
            <div className={styles.successIcon}>✓</div>
            <div className={styles.info}>
                <div className={styles.ords}><p>Order placed successfully!</p></div>
                <div className={styles.check}><p>You can now check it in the Orders section of the dashboard.</p></div>
            </div>
        </div>
    );

    return (
        <div>
          {showSuccessDialog && <SuccessDialog />}
            {isOpen && (
                <div className={styles.modal} role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true">
            
                <form ref={formRef} className={styles.modalOverlay} onSubmit={submitForm}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalheads}>
                                <h3 className={styles.modalTitle} id="exampleModalLabel">Vehicle Order Form</h3>
                                <p>Please fill in the form below to proceed. Thank you for choosing our services!</p>
                            </div>
                            <button type="button" className={styles.closeButton} aria-label="Close" onClick={onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGroup}>
                                <label className={styles.form_label1}>Car Type: </label>
                                <input type="text" className={styles.formControl2} id="carType" value={carType} readOnly />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.form_label}>Name: </label>
                                <input type="text" className={styles.formControl3} id="firstName" placeholder="First Name" onChange={handleInputChange} required/>
                                <input type="text" className={styles.formControl3} id="lastName" placeholder="Last Name" onChange={handleInputChange} required/>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.form_label}>Email: </label>
                                <input type="email" className={styles.formControl2} id="email" placeholder="name@gmail.com" onChange={handleInputChange} required/>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.form_label}>Phone:</label>
                                <input type="tel" className={styles.formControl2} id="phone" placeholder="91-xxxxxxxxxx" pattern="[0-9]{10}" required onChange={handleInputChange} />
                            </div>
                            <div className={styles.formGroup2}>
                                <div className={styles.line}>
                                    <label className={styles.form_label}>Address:</label>
                                    <input type="text" className={styles.formControl} id="houseNo" placeholder="House No." required onChange={handleInputChange} />
                                    <input type="text" className={styles.formControl} id="streetAddress" placeholder="Street Address" required onChange={handleInputChange} />
                                </div>
                                <div className={styles.line2}>
                                    <input type="text" className={styles.formControl} id="city" placeholder="City" required onChange={handleInputChange} />
                                    <input type="text" className={styles.formControl} id="region" placeholder="Region" required onChange={handleInputChange} />
                                </div>
                                <div className={styles.line2}>
                                    <input type="text" className={styles.formControl} id="postalCode" placeholder="Postal/ Zip Code" required onChange={handleInputChange} />
                                    <input type="text" className={styles.formControl} id="state" placeholder="State" required onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className={styles.textline}>
                                <p>* Please upload a merged document containing your 'ID Proof', 'Driver's License' and 'Address Proof'.</p>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.form_label}>Upload Documents:</label>
                                <input type="file" className={styles.formControl} id="file" accept="application/pdf" onChange={handleFileChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.form_label}>Comments:</label>
                                <textarea className={styles.formControl4} id="comments" placeholder="Enter any additional requests or comments" onChange={handleInputChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.form_label}>
                                    <input type="checkbox" id="confirm"  required />  {/*onChange={handleCheckboxChange}*/}
                                    {/* {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>} */}
                                     I confirm that I have reviewed my order and agree to the terms and conditions.
                                </label>
                            </div>
                            
                        </div>
                        <div className={styles.modalFooter}>
                             <button type="submit" className={styles.btn}>Submit</button>  {/*className={`${styles.btn} ${isChecked ? styles.btnPrimary : styles.btnSecondary}`} disabled={!isChecked} */}
                        </div>
                    </div>
                </form>
            </div>
          )}
        </div>
        
    );
}

export default PlaceOrder;
