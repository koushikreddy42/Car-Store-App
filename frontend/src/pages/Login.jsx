import React, { useState, useContext } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiEyeOffLine, RiEyeFill, RiLockPasswordFill } from "react-icons/ri";
import styles from "../components/Login/Login.module.css";
import logo from "../components/Assets/logo.png";
import axios from "axios";
import { store } from "../App";
import { Navigate, Link } from "react-router-dom";

function Login() {
  const [token, setToken] = useContext(store);
  const [isLogin, setIsLogin] = useState(true);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const switchToLogin = () => {
    setIsLogin(true);
    setUserId("");
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
    setSuccessMessage("");
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const switchToSignUp = () => {
    setIsLogin(false);
    setUserId("");
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
    setSuccessMessage("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      setError("");
      setSuccess("");
      axios
        .post("https://car-store-app-api.vercel.app/api/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          setToken(res.data.token); // Set the token state
          console.log("Token:", res.data.token);
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            setError(err.response.data);
          } else {
            setError("Login failed");
          }
          console.error("Login error:", err);
        });
    } else {
      setError("");
      setSuccess("");
      axios
        .post("https://car-store-app-api.vercel.app/api/register", {
          username: userId,
          email: email,
          password: password,
        })
        .then((res) => {
          setSuccess(res.data);
        })
        .catch((error) => {
          if (err.response && err.response.data) {
            setError(err.response.data);
          } else {
            setError("An error occurred. Please try again.");
          }
        });
    }
  };

  if (token) {
    return <Navigate to="/home" />;
  }

  return (
    <div className={styles.pageContainer}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.container}>
        <div className={styles.header}>
          <button
            onClick={switchToLogin}
            className={`${styles.toggle_button} ${
              isLogin ? styles.active : ""
            }`}
          >
            Login
          </button>
          <button
            onClick={switchToSignUp}
            value="Register"
            className={`${styles.toggle_button} ${
              !isLogin ? styles.active : ""
            }`}
          >
            Sign Up
          </button>
        </div>
        <div className={styles.underline}></div>
        {error && <div className={styles.error_message}>{error}</div>}
        {success && <div className={styles.success_message}>{success}</div>}
        <form onSubmit={handleSubmit}>
          {isLogin && (
            <div>
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div>
                    {showPassword ? (
                      <RiEyeFill
                        className={styles.eyeicon}
                        onClick={handlePassword}
                      />
                    ) : (
                      <RiEyeOffLine
                        className={styles.eyeicon}
                        onClick={handlePassword}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.lost_password}>
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <div className={styles.bttn}>
                <button type="submit" className={styles.login_button}>
                  Login
                </button>
              </div>
            </div>
          )}
        </form>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <div className={styles.inputs}>
                <div className={styles.signup_input}>
                  <FaUserAlt className={styles.icon} />
                  <input
                    placeholder="Enter UserId"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    pattern="^[a-zA-Z][a-zA-Z0-9]*$"
                    title="User ID must contain letters, may contain numbers, and must start with a letter."
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div>
                    {showPassword ? (
                      <RiEyeFill
                        className={styles.eyeicon}
                        onClick={handlePassword}
                      />
                    ) : (
                      <RiEyeOffLine
                        className={styles.eyeicon}
                        onClick={handlePassword}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.bttn}>
                <button type="submit" className={styles.signup_button}>
                  Sign up
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;