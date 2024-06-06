import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import styles from './login.module.css'

function Login() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [successMessage, setSuccessMessage]= useState('');

    const handleUserTypeChange = (e) => {
        setIsAdmin(e.target.value === 'admin');
        setUserId('');
        setEmail('');
        setPassword('');
        setError(''); 
        setSuccessMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAdmin) {
            if (userId === 'admin' && password === 'admin') {
                console.log('Admin Login Successful');
                setError('');
                setSuccessMessage('Login Successful!');
                
            } else {
                setError('Invalid Admin Credentials!');
                setSuccessMessage('');
            }
        } else {
            console.log('Customer Login - UserId:', userId);
            console.log('Customer Login - Email:', email);
            console.log('Customer Login - Password:', password);
            setError(''); 
            setSuccessMessage('Login Successful!');
            
        }
    };

    return (
        <div className={styles.boxdiv}>
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.text}>Login</div>
                <div className={styles.underline}></div>
            </div>
            <div className={styles.user_type_toggle}>
                <label className={styles.options}>
                    <input
                        type="radio"
                        value="customer"
                        checked={!isAdmin}
                        onChange={handleUserTypeChange}
                    />
                    Customer
                </label>
                <label className={styles.options}>
                    <input
                        type="radio"
                        value="admin"
                        checked={isAdmin}
                        onChange={handleUserTypeChange}
                    />
                    Admin
                </label>
            </div>
           
            {error && <div className={styles.error_message}>{error}</div>}
            {successMessage && <div className={styles.success_message}>{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <FaUserAlt className={styles.icon} />
                        <input
                            placeholder="Enter UserId"
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>
                    {!isAdmin && (
                        <div className={styles.input}>
                            <MdEmail className={styles.icon} />
                            <input
                                placeholder="name@example.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className={styles.input}>
                        <RiLockPasswordFill className={styles.icon} />
                        <input
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button className={styles.login} type="submit">Login</button>
            </form>
        </div>
        </div>
    );
}

export default Login;
