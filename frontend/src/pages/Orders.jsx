import React from "react";
import styles from "../components/Dashboard/Orders.module.css";
import t3p from "../components/Assets/t3p.png";
import { Link } from "react-router-dom";

const OrderDetails = ({ orderDetails }) => {
  console.log(orderDetails);

  // Check if orderDetails is undefined or null
  if (!orderDetails) {
    return <div className={styles.OrderDetails}>Loading...</div>;
  }

  // Destructure electricCarOrders and gasCarOrders from orderDetails with default empty arrays
  const { electricCarOrders = [], gasCarOrders = [] } = orderDetails;

  console.log(gasCarOrders, electricCarOrders);

  return (
    <div className={styles.OrderDetails}>
      <h2>Order Details</h2>
      <p>Here you can find your order details...</p>

      {electricCarOrders.length > 0 || gasCarOrders.length > 0 ? (
        <>
          <button className={styles.button}>Buy More</button>
          <div className={styles.cardsContainer}>
            {/* Render electric car orders */}
            {electricCarOrders.map((order) => (
              <div key={order._id} className={styles.card}>
                <img
                  className={styles.car_img}
                  src={order.car.image}
                  alt={order.car.model}
                />
                <div className={styles.car_details}>
                  <div className={styles.car_title}>{order.car.title}</div>
                  <div className={styles.others}>
                    <div>Electric</div>
                    <div>Top speed {order.car.topspeed}</div>
                    <div className={styles.color}>{order.car.colour}</div>
                  </div>
                  <div className={styles.price}>Rs.{order.car.price}</div>
                </div>
                <div className={styles.bttns}>
                  <Link
                    to={`/electric-booking/${order.car._id}/${"ev"}/${false}`}
                    style={{ textDecoration: "none" }}
                  >
                    <button className={styles.view}>View</button>
                  </Link>
                  {order.status === "pending" && (
                    <div className={styles.status}>&#x23F3; Pending</div>
                  )}
                  {order.status === "declined" && (
                    <div className={styles.status}>&#x274C; Declined</div>
                  )}
                  {order.status === "accepted" && (
                    <div className={styles.status}>&#x2714; Sold</div>
                  )}
                </div>
              </div>
            ))}

            {/* Render gas car orders */}
            {gasCarOrders.map((order) => (
              <div key={order._id} className={styles.card}>
                <img
                  className={styles.car_img}
                  src={order.car.image}
                  alt={order.car.model}
                />
                <div className={styles.car_details}>
                  <div className={styles.car_title}>{order.car.title}</div>
                  <div className={styles.others}>
                    <div>Gas</div>
                    <div>Top speed {order.car.topspeed}</div>
                    <div className={styles.color}>{order.car.colour}</div>
                  </div>
                  <div className={styles.price}>Rs.{order.car.price}</div>
                </div>
                <div className={styles.bttns}>
                  <Link
                    to={`/gas-booking/${order.car._id}/${"gas"}/${false}`}
                    style={{ textDecoration: "none" }}
                  >
                    <button className={styles.view}>View</button>
                  </Link>
                  {order.status === "pending" && (
                    <div className={styles.status}>&#x23F3; Pending</div>
                  )}
                  {order.status === "declined" && (
                    <div className={styles.status}>&#x274C; Declined</div>
                  )}
                  {order.status === "accepted" && (
                    <div className={styles.status}>&#x2714; Sold</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Link to="/electric">
          <button className={styles.button}>Start Buying</button>
        </Link>
      )}
    </div>
  );
};

export default OrderDetails;
