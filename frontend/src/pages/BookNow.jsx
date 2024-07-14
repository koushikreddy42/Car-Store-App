import React, { useState, useContext, useEffect } from "react";
import { store } from "../App";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlaceOrder from "./PlaceOrder.jsx";
import styles from "../components/Booking/BookNow.module.css";
import t3p from "../components/Assets/t3p.png";
import t3p2 from "../components/Assets/t3p2.png";

function BookNow() {
  const { param1, param2 } = useParams();
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Define images and navigation functions based on car data
  const images = car ? [car.image, t3p2] : [];

  const goToPrevious = () => {
    if (car) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }
  };

  const goToNext = () => {
    if (car) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

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
  useEffect(() => {
    if (param2 === "ev" || param2 === "gas") {
      const endpoint = param2 === "ev" ? "electric-listt" : "gas-listt";

      const fetchCar = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/${endpoint}/${param1}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setCar(data);
        } catch (error) {
          setError(error.message);
        }
      };
      const fetchData = async () => {
        await fetchCar();
      };

      fetchData();
    }
  }, [param1, param2]);
  console.log(car);

  const [isPlaceOrderOpen, setPlaceOrderOpen] = useState(false);
  const openPlaceOrder = () => setPlaceOrderOpen(true);
  const closePlaceOrder = () => setPlaceOrderOpen(false);

  return (
    <div className={styles.container}>
      {car ? (
        <>
          <div className={styles.carModel}>
            <h2>{car.title}</h2>
            <p className={styles.perf}>Performance Edition</p>
          </div>
          <div className={styles.imageSlider}>
            <button className={styles.buttonLeft} onClick={goToPrevious}>
              &lt;
            </button>
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
            />
            <button className={styles.buttonRight} onClick={goToNext}>
              &gt;
            </button>
          </div>

          <div className={styles.addtext}>
            <div className={styles.pricetag}>
              <p className={styles.price}>$ {car.price}</p>
              <p className={styles.tax}>Excluding taxes and order fee</p>
            </div>
            <hr className={styles.line} />
            <div className={styles.card}>
              <a href="#addtowishlist">
                <i className="fa-regular fa-heart fa-lg"></i>
              </a>
              <button className={styles.order} onClick={openPlaceOrder}>
                Place Order
              </button>
              <PlaceOrder isOpen={isPlaceOrderOpen} onClose={closePlaceOrder} />
            </div>
            <button className={styles.tdrive}>
              Book Test Drive <i class="fa-regular fa-calendar"></i>
            </button>
          </div>

          <div className={styles.additionalDetails}>
            <div className={styles.desc}>
              <h4 className={styles.descHeading}>Warranty</h4>
              <p className={styles.descPara}>50,000 mi / 4 years</p>
            </div>
            <hr className={styles.endline} />
            <div className={styles.desc}>
              <h4 className={styles.descHeading}>Performance</h4>
              <p className={styles.descPara}>
                Model 3 comes with the option of dual motor all-wheel drive,
                Performance Wheels and Brakes for total control, in all weather
                conditions and a spoiler improves stability at high speeds
                allowing Model 3 to accelerate from 0-60 mph in as little as 3.2
                seconds.
              </p>
            </div>
            <hr className={styles.endline} />
            <div className={styles.desc}>
              <h4 className={styles.descHeading}>Safety</h4>
              <p className={styles.descPara}>
                Safety is the most important part of the overall Model 3 design.
                The metal structure is a combination of aluminum and steel, for
                maximum strength in every area. In a roof-crush test, Model 3
                resisted four times its own mass, even with an all-glass roof.
              </p>
            </div>
            <hr className={styles.endline} />
            <div className={styles.desc}>
              <h4 className={styles.descHeading}>Range</h4>
              <p className={styles.descPara}>
                Model 3 is fully electric, so you never need to visit a gas
                station again. If you charge overnight at home, you can wake up
                to a full battery every morning. And when you’re on the road,
                it’s easy to plug in along the way—at any public station or with
                the Tesla charging network.
              </p>
            </div>
          </div>

          <div className={styles.feat}>
            <div className={styles.box1}>
              <a>
                <i class="fa-solid fa-stopwatch"></i>
              </a>
              <div className={styles.midbox}>
                <p className={styles.num}>{car.time60}</p>
                <p className={styles.text}>sec</p>
              </div>
              <p className={styles.text2}>0-60mph</p>
            </div>
            <div className={styles.box2}>
              <a>
                <i class="fa-solid fa-gauge-simple-high"></i>
              </a>
              <div className={styles.midbox}>
                <p className={styles.num}>{car.topspeed}</p>
                <p className={styles.text}>mph</p>
              </div>
              <p className={styles.text2}>Top Speed</p>
            </div>
            <div className={styles.box3}>
              <a>
                <i class="fa-solid fa-gas-pump"></i>
              </a>
              <div className={styles.midbox}>
                <p className={styles.num}>300</p>
                <p className={styles.text}>ml</p>
              </div>
              <p className={styles.text2}>Range</p>
            </div>
          </div>

          <div className={styles.keyfeat}>
            <p className={styles.keyhead}>
              <b>Key Features</b>
            </p>
            <div className={styles.feats}>
              <div className={styles.icontxt}>
                <a>
                  <i class="fa-solid fa-spray-can"></i>
                </a>
                <p>{car.colour}</p>
              </div>
              <div className={styles.icontxt}>
                <a>
                  <i class="fa-solid fa-couch"></i>
                </a>
                <p>{car.interior}</p>
              </div>
              <div className={styles.icontxt}>
                <a>
                  <i class="fa-solid fa-circle-radiation"></i>
                </a>
                <p>Autopilot</p>
              </div>
              <div className={styles.icontxt}>
                <a>
                  <i class="fa-solid fa-wifi"></i>
                </a>
                <p>Premium Connectivity</p>
              </div>
              <div className={styles.icontxt}>
                <a>
                  <i class="fa-solid fa-gear"></i>
                </a>
                <p>{car.wheel}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p> // Placeholder for when car data is being fetched
      )}
    </div>
  );
}
export default BookNow;
