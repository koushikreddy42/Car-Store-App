import React, { useState } from "react";
import axios from "axios";
import styles from "../components/ForgotPassword.module.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/forgot-password",
        { email }
      );
      setMessage(response.data);
      setError("");
    } catch (error) {
      setError(error.response?.data || "An error occurred");
      setMessage("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.h2}>Forgot Password</h2>
        <form className={styles.box} onSubmit={handleSubmit}>
          {!email && (
            <div className={styles.req}>
              *Enter the email associated with your account
            </div>
          )}

          <input
            className={styles.email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button className={styles.button} type="submit">
            Reset Password
          </button>
        </form>
        {message && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;