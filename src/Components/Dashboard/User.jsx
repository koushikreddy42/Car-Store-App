import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { store } from "../App";
import styles from "../components/Dashboard/User.module.css";
import logo from "../components/Assets/logo.png";
import t3p from "../components/Assets/t3p.png";
import OrderDetails from "./Orders.jsx";

function User() {
  const [isOrderOpen, setOrderOpen] = useState(false);
  const openOrder = () => setOrderOpen(true);
  const closeOrder = () => setOrderOpen(false);
  const [token, setToken] = useContext(store);
  const [userdata, setUserData] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  //button to filter only cars in sale
  const [filteredData, setFilteredData] = useState(data);
  const [showInSale, setShowInSale] = useState(false);

  const toggleFilter = () => {
    if (showInSale) {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((car) => car.status === "In Sale"));
    }
    setShowInSale(!showInSale);
  };

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:8080/api/myprofile", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  useEffect(() => {
    if (!token || !userdata) return;

    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/orders", {
          headers: {
            "x-token": token,
            "x-user-id": userdata._id,
          },
        });
        setOrderDetails(response.data);
        console.log(response.data);
        console.log(`Order details:${orderDetails}`);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [token, userdata]);

  if (!token) {
    return <Navigate to="/sign" />;
  }

  const [electricData, setElectricData] = useState([]);
  const [gasData, setGasData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (userdata) {
        console.log(userdata._id);
        try {
          const response = await axios.get(
            `http://localhost:8080/api/owner-cars?userId=${userdata._id}`
          );
          const { electricCars, gasCars } = response.data;

          // Map electric cars
          const mappedElectricCars = electricCars.map((car, index) => ({
            id: index + 1,
            image: car.image,
            model: car.title,
            year: car.year,
            price: car.price,
            topSpeed: car.topspeed,
            time60: car.time60,
            range: car.range,
            color: car.colour,
            interior: car.interior,
            wheel: car.wheel,
            description: car.description,
            status: car.isSold ? "Sold" : "In Sale",
          }));

          // Map gas cars
          const mappedGasCars = gasCars.map((car, index) => ({
            id: index + 1,
            image: car.image,
            model: car.title,
            year: car.year,
            price: car.price,
            topSpeed: car.topspeed,
            time60: car.time60,
            range: car.range,
            color: car.colour,
            interior: car.interior,
            wheel: car.wheel,
            description: car.description,
            status: car.isSold ? "Sold" : "In Sale",
          }));

          // Update state
          setElectricData(mappedElectricCars);
          setGasData(mappedGasCars);
          // setLoading(false);
        } catch (err) {
          console.error("Error fetching cars:", err);
          // setError(err.message);
          // setLoading(false);
        }
      }
    };

    fetchData();
  }, [userdata]);
  // if(electricData.length>0) console.log(electricData)
  const startSelling = () => {
    console.log("Start selling");
  };

  const sellAgain = () => {
    console.log("Sell again");
  };
  const combinedData = [...electricData, ...gasData];
  console.log(combinedData);

  return (
    userdata && (
      <div className={styles.page}>
        <div className={styles.header}>
          <img className={styles.logo} src={logo} alt="Logo" />
          <div
            className={`${styles.orders} ${isOrderOpen ? styles.selected : ""}`}
            onClick={openOrder}
          >
            Orders
          </div>
          <div
            className={`${styles.sales} ${!isOrderOpen ? styles.selected : ""}`}
            onClick={closeOrder}
          >
            Sell
          </div>
          <Link to="/dashboard-buyer">
            <div>Requests</div>
          </Link>
          <button className={styles.welcome}>
            Welcome {userdata.username}
          </button>
        </div>
        <div className={styles.details}>
          {isOrderOpen ? (
            <OrderDetails orderDetails={orderDetails} />
          ) : (
            <div className={styles.salesDetails}>
              <h2>Sales</h2>
              <p>Here you can find the sales information...</p>
              {combinedData.length > 0 ? (
                <>
                  {/* toggle button to filter cars in sale */}

                  <button onClick={toggleFilter} className={styles.button}>
                    {showNotSold ? "Show All Cars" : "Show Cars in sale"}
                  </button>
                  <div className={styles.tableContainer}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Img</th>
                          <th>Title</th>
                          <th>Year</th>
                          <th>Price</th>
                          <th>Top Speed</th>
                          <th>Time 60</th>
                          <th>Range</th>
                          <th>Color</th>
                          <th>Interior</th>
                          <th>Wheel</th>
                          <th>Description</th>
                          <th>Status</th>
                          {showInSale && <th>Options</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {combinedData.map((car) => (
                          <tr key={car.id}>
                            <td>
                              <img
                                className={styles.image}
                                src={car.image}
                                alt={car.model}
                              />
                            </td>
                            <td>{car.model}</td>
                            <td>{car.year}</td>
                            <td>{car.price}</td>
                            <td>{car.topSpeed}</td>
                            <td>{car.time60}</td>
                            <td>{car.range}</td>
                            <td>{car.color}</td>
                            <td>{car.interior}</td>
                            <td>{car.wheel}</td>
                            <td>{car.description}</td>
                            <td>{car.status}</td>
                            {showInSale && (
                              <td>
                                <Link
                                  to={`/edit/${car.id}`}
                                  className={styles.button}
                                >
                                  Edit
                                </Link>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <button onClick={startSelling} className={styles.button}>
                  Start Selling
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default User;
