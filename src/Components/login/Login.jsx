import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import './login.css';  

function Login() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Define the error state here

    const handleUserTypeChange = (e) => {
        setIsAdmin(e.target.value === 'admin');
        setUserId('');
        setEmail('');
        setPassword('');
        setError(''); // Clear error message when switching user types
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAdmin) {
            if (userId === 'admin' && password === 'admin') {
                console.log('Admin Login Successful');
                setError('');
            } else {
                setError('Invalid Admin Credentials');
            }
        } else {
            console.log('Customer Login - UserId:', userId);
            console.log('Customer Login - Email:', email);
            console.log('Customer Login - Password:', password);
            setError(''); // Reset error message for customer login
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <div className="user-type-toggle">
                <label>
                    <input
                        type="radio"
                        value="customer"
                        checked={!isAdmin}
                        onChange={handleUserTypeChange}
                    />
                    Customer
                </label>
                <label>
                    <input
                        type="radio"
                        value="admin"
                        checked={isAdmin}
                        onChange={handleUserTypeChange}
                    />
                    Admin
                </label>
            </div>
           
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <div className="input">
                        <FaUserAlt className="icon" />
                        <input
                            placeholder="Enter UserId"
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>
                    {!isAdmin && (
                        <div className="input">
                            <MdEmail className="icon" />
                            <input
                                placeholder="name@example.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="input">
                        <RiLockPasswordFill className="icon" />
                        <input
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button className="login" type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
