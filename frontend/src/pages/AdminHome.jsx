import React, { useState, useContext, useEffect } from "react";
import { store } from "../App";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "../components/Home/AdminHome.module.css";
import logo from "../components/Assets/logo.png";
import fire from "../components/Assets/fire.png";
import electric from "../components/Assets/evs.png";

function AdminHome() {
  const [adminToken, setAdminToken] = useContext(store);
  const [data, setData] = useState(null);
  if (!adminToken) {
    return <Navigate to="/admin-sign" />;
  }
  useEffect(() => {
    axios
      .get("https://car-store-app-api.vercel.app/api/admin-myprofile", {
        headers: {
          "x-token": adminToken,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={styles.main_body}>
      <img className={styles.logo} src={logo} />

      <div className={styles.buttons_box}>
        <Link to="/electric-list">
          <div className={styles.options}>
            <button className={styles.evs}>
              {" "}
              <img className={styles.icon} src={electric} /> EVs
            </button>
          </div>
        </Link>
        <Link to="/gas-list">
          <div className={styles.options}>
            <button className={styles.gas}>
              <img className={styles.icon} src={fire} /> Gas
            </button>
          </div>
        </Link>
        <Link to="/admin-dashboard">
          <div className={styles.options}>
            <button className={styles.customers}>Dashboard</button>
          </div>
        </Link>
        <Link to="/admin-electric-form">
          <div className={styles.options}>
            <button className={styles.customers}>Sell Ev Cars</button>
          </div>
        </Link>
        <Link to="/admin-gas-form">
          <div className={styles.options}>
            <button className={styles.customers}>Sell Gas Cars</button>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default AdminHome;