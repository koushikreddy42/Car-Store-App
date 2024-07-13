import React, { useState, useContext, useEffect } from "react";
import { store } from "../App";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "../components/List/GasList.module.css";

function GasList() {
  const [data, setData] = useState([]);
  const [adminToken, setAdminToken] = useContext(store);
  const [tokendata, setTokenData] = useState(null);
  if (!adminToken) {
    return <Navigate to="/admin-sign" />;
  }
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin-myprofile", {
        headers: {
          "x-token": adminToken,
        },
      })
      .then((res) => setTokenData(res.tokendata))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/gas-list");
      setData(response.data);
    } catch (error) {
      console.error("Error retrieving gas car data:", error);
    }
  };
  const handleAccept = async (carId) => {
    try {
      await axios.put(`http://localhost:8080/api/gas-list/accept/${carId}`);
      setData((prevData) =>
        prevData.map((car) =>
          car._id === carId ? { ...car, isDisplayed: true } : car
        )
      );
    } catch (error) {
      console.error("Error accepting car:", error);
    }
  };

  const handleDecline = async (carId) => {
    try {
      await axios.delete(`http://localhost:8080/api/gas-list/decline/${carId}`);
      setData((d) => d.filter((car) => car._id !== carId));
    } catch (error) {
      console.error("Error declining car:", error);
    }
  };

  return (
    <div className="bodyy">
      <div className={styles.record_list}>
        <div className={styles.header}>
          <h3> Gas Cars </h3>
        </div>
        <div className={styles.tabular}>
          <table className={`${styles.table} ${styles.tableStriped}`}>
            <thead>
              <tr>
                <th>User</th>
                <th>Image</th>
                <th>Title</th>
                <th>Year</th>
                <th>Price</th>
                <th>Top Speed</th>
                <th>Time 60</th>
                <th>Mileage</th>
                <th>Engine</th>
                <th>Gearbox</th>
                <th>Transmission</th>
                <th>Colour</th>
                <th>Interior</th>
                <th>Wheel</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((car) => (
                <tr key={car._id}>
                  <td>{car.addedBy.username}</td>
                  <td>
                    <img
                      className={styles.image}
                      src={car.image}
                      alt={`carImg${car.id}`}
                    />
                  </td>
                  <td>{car.title}</td>
                  <td>{car.year}</td>
                  <td>{car.price}</td>
                  <td>{car.topspeed}</td>
                  <td>{car.time60}</td>
                  <td>{car.mileage}</td>
                  <td>{car.engine}</td>
                  <td>{car.gearbox}</td>
                  <td>{car.transmission}</td>
                  <td>{car.colour}</td>
                  <td>{car.interior}</td>
                  <td>{car.wheel}</td>
                  <td>{car.description}</td>
                  {car.isDisplayed ? (
                    <td>Displayed</td>
                  ) : (
                    <>
                      <td>
                        <button
                          className={styles.acceptbtn}
                          onClick={() => handleAccept(car._id)}
                        >
                          Accept
                        </button>
                      </td>
                      <td>
                        <button
                          className={styles.declinebtn}
                          onClick={() => handleDecline(car._id)}
                        >
                          Decline
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default GasList;
