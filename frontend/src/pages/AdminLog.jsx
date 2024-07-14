import React, { useState, useContext } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiEyeOffLine, RiEyeFill, RiLockPasswordFill } from "react-icons/ri";
import styles from "../components/Login/AdminLog.module.css";
import logo from "../components/Assets/logo.png";
import axios from "axios";
import { store } from "../App";
import { Navigate } from "react-router-dom";

function AdminLog() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [adminToken, setAdminToken] = useContext(store);
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    axios
      .post("https://car-store-app-api.vercel.app/api/admin-login", {
        username: userId,
        password: password,
      })
      .then((res) => {
        setAdminToken(res.data.token); // Set the token state
        console.log("Admin-Token:", res.data.token);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError(err.response.data);
        } else {
          setError("Login failed");
        }
        console.error("Login error:", err);
      });
  };

  if (adminToken) {
    return <Navigate to="/admin-home" />;
  }

  return (
    <div className={styles.main}>
      <img src={logo} alt="Logo" className={styles.logopic} />

      <div className={styles.box}>
        <div className={styles.heading}>
          <div className={styles.maintxt}>Admin Login</div>
          <div className={styles.line}></div>
        </div>
        {error && <div className={styles.error_message}>{error}</div>}
        {successMessage && (
          <div className={styles.success_message}>{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputss}>
            <div className={styles.inputt}>
              <FaUserAlt className={styles.pic} />
              <input
                type="text"
                placeholder="UserId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputt}>
              <RiLockPasswordFill className={styles.pic} />
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
          <div className={styles.submitt}>
            <button className={styles.logButton} type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLog;
