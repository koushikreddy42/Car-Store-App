import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import styles from './Admin.module.css';

function AdminLog() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        
        if (userId === 'admin' && password === 'admin') {
            setSuccessMessage('Login Successful!');
        } else {
            setError('Invalid Admin Credentials!');
        }
    };

    return (
        <div className={styles.main}>
            
            <div className={styles.box}>
                <div className={styles.heading}>
                    <div className={styles.maintxt}>Login</div>
                    <div className={styles.line}></div>
                </div>
                {error && <div className={styles.error_message}>{error}</div>}
                {successMessage && <div className={styles.success_message}>{successMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputss}>
                        <div className={styles.inputt}>
                            <FaUserAlt className={styles.pic} />
                            <input
                                type='text'
                                placeholder='UserId'
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputt}>
                            <RiLockPasswordFill className={styles.pic} />
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.submitt}>
                        <button className={styles.logButton} type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLog;
