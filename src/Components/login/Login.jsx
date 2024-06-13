import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import styles from './login.module.css';
import logo from '../Assets/logo.png';

function Login() {
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const switchToLogin = () => {
        setIsLogin(true);
        setUserId('');
        setEmail('');
        setPassword('');
        setError('');
        setSuccessMessage('');
    };

    const switchToSignUp = () => {
        setIsLogin(false);
        setUserId('');
        setEmail('');
        setPassword('');
        setError('');
        setSuccessMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log('Login - Email:', email);
            console.log('Login - Password:', password);
            setError('');
            setSuccessMessage('Login Successful!');
        } else {
            console.log('Sign Up - UserId:', userId);
            console.log('Sign Up - Email:', email);
            console.log('Sign Up - Password:', password);
            setError('');
            setSuccessMessage('Sign Up Successful!');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <img src={logo} alt="Logo" className={styles.logo} />
                <div className={styles.container}>
                    <div className={styles.header}>
                        <button onClick={switchToLogin} className={`${styles.toggle_button} ${isLogin ? styles.active : ''}`}>
                            Login
                        </button>
                        <button onClick={switchToSignUp} className={`${styles.toggle_button} ${!isLogin ? styles.active : ''}`}>
                            Sign Up
                        </button>
                    </div>
                    <div className={styles.underline}></div>
                    {error && <div className={styles.error_message}>{error}</div>}
                    {successMessage && <div className={styles.success_message}>{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        
                      {isLogin && ( <div>
                        <div className={styles.inputs}>
                        <div className={styles.login_input}>
                                    <MdEmail className={styles.icon} />
                                    <input
                                        placeholder="name@example.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={styles.login_input}>
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
                            <div className={styles.lost_password}>
                                Lost Password? <a href="#">Click here</a>
                            </div>
                            <div className={styles.bttn}>
                        <button type="submit" className={styles.login_button}>
                            Login
                        </button>
                        </div>

                        </div> )}
                        </form>


                    <form onSubmit={handleSubmit}>
                    {!isLogin && ( <div>
                        <div className={styles.inputs}>
                        <div className={styles.signup_input}>
                                <FaUserAlt className={styles.icon} />
                                <input
                                    placeholder="Enter UserId"
                                    type="text"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    required
                                />
                            </div>

                        <div className={styles.signup_input}>
                        <MdEmail className={styles.icon} />
                        <input
                            placeholder="name@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.signup_input}>
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
                        <div className={styles.bttn}>
                    <button type="submit" className={styles.signup_button}>
                        Sign up
                    </button>
                    </div>

                    </div> )}

                    </form>
                </div>
        </div>
    );
}

export default Login;