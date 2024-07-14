import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      const response = await axios.post(
        "https://car-store-app-api.vercel.app/api/reset-password",
        { token, newPassword: password }
      );
      setMessage(response.data);
      setTimeout(() => navigate("/sign"), 3000);
    } catch (error) {
      setError(error.response?.data || "An error occurred");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Reset Password</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          required
          style={inputStyle}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Reset Password
        </button>
      </form>
      {message && <p style={successStyle}>{message}</p>}
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f8f8f8",
};

const headerStyle = {
  marginBottom: "20px",
  fontSize: "24px",
  color: "#333",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "300px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const successStyle = {
  marginTop: "10px",
  color: "green",
};

const errorStyle = {
  marginTop: "10px",
  color: "red",
};

export default ResetPassword;