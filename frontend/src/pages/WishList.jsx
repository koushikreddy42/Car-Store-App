import React, { useState, useEffect, useContext } from "react";
import styles from "../components/WishList.module.css";
import t3p from "../components/Assets/t3p.png";
import wish from "../components/Assets/wishlist.png";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { store } from "../App";
import { Link, Navigate } from "react-router-dom";

function WishList() {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/myprofile", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!token) {
    return <Navigate to="/sign" />;
  }

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/favourites",
          {
            headers: {
              "x-token": token,
            },
          }
        );
        setFavorites(response.data.favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    const fetchData = async () => {
      await fetchFavorites();
    };

    fetchData();
  }, [token]);
  const removeFavorite = async (id) => {
    try {
      await axios.post(
        "http://localhost:8080/api/remove-favourite",
        { carId: id },
        {
          headers: {
            "x-token": token,
          },
        }
      );
      setFavorites(favorites.filter((fav) => fav.car._id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };
  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <Link to={"/electric"} style={{ fontSize: "18px", color: "white" }}>
          <i className="fas fa-home"></i> Home
        </Link>
        <div className="title"> ~ Wishlist </div>
      </div>
      <div className={styles.listbox}>
        <div className={styles.count}>
          <img className={styles.wish} src={wish} /> Number of items in your
          list: {favorites.length}
        </div>
        {favorites.map((fav) => (
          <div className={styles.product}>
            <img className={styles.car_img} src={fav.car.image} />
            <div className={styles.car_details}>
              <div className={styles.car_title}>{fav.car.title}</div>
              <div className={styles.others}>
                <div>
                  {fav.carType === "electriccarmodel" ? "Electric" : "Gas"}
                </div>
                <div>Top speed {fav.car.topspeed}</div>
                <div className={styles.color}>{fav.car.colour}</div>
              </div>
              <div className={styles.price}>${fav.car.price}</div>
            </div>
            <div className={styles.bttns}>
              {fav.carType === "electriccarmodel" ? (
                <Link
                  to={`/electric-booking/${fav.car._id}/${"ev"}/${true}`}
                  style={{ textDecoration: "none" }}
                >
                  <button className={styles.view}>View</button>
                </Link>
              ) : (
                <Link
                  to={`/gas-booking/${fav.car._id}/${"gas"}/${true}`}
                  style={{ textDecoration: "none" }}
                >
                  <button className={styles.view}>View</button>
                </Link>
              )}

              <button
                className={styles.remove}
                onClick={() => removeFavorite(fav.car._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default WishList;
