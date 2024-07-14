import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { store } from "../App";
import styles from "../components/Forms/GasForm.module.css";

function EditGasCar() {
  const [carData, setCarData] = useState(null);
  const [token] = useContext(store);
  const location = useLocation();
  const navigate = useNavigate();
  const carId = location.state?.carId;
  const [showProcessingDialog, setShowProcessingDialog] = useState(false);

  useEffect(() => {
    if (carId) {
      axios
        .get(`https://car-store-app-api.vercel.app/api/get-gas-car/${carId}`, {
          headers: { "x-token": token },
        })
        .then((res) => setCarData(res.data))
        .catch((err) => console.error(err));
    }
  }, [carId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setShowProcessingDialog(true);
      await axios.put(
        `https://car-store-app-api.vercel.app/api/edit-gas-car/${carId}`,
        carData,
        {
          headers: { "x-token": token },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!carData) return <div>Loading...</div>;
  console.log(carData);

  return (
    <div className={styles.page}>
      <form className={styles.gasform} onSubmit={handleSubmit}>
        <div className={styles.box}>
          <h1 className={styles.heading}>Edit Gas Car</h1>
        </div>

        <div className={styles.row}>
          <div className={styles.info}>
            <label>Title</label>
            <input
              name="title"
              value={carData.title}
              required
              onChange={handleInputChange}
              placeholder="2019 Ford Mustang"
            />
          </div>
          <div className={styles.info}>
            <label>Year</label>
            <input
              name="year"
              type="number"
              max={2024}
              min={1990}
              value={carData.year}
              required
              onChange={handleInputChange}
              placeholder="2024"
            />
          </div>
          <div className={styles.info}>
            <label>Price</label>
            <input
              name="price"
              type="number"
              value={carData.price}
              required
              onChange={handleInputChange}
              placeholder="58100"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.info}>
            <label>Top Speed</label>
            <input
              name="topspeed"
              value={carData.topspeed}
              required
              onChange={handleInputChange}
              placeholder="185"
            />
          </div>
          <div className={styles.info}>
            <label>0-60 Time</label>
            <input
              name="time60"
              value={carData.time60}
              required
              onChange={handleInputChange}
              placeholder="3.8"
            />
          </div>
          <div className={styles.info}>
            <label>Mileage</label>
            <input
              name="mileage"
              value={carData.mileage}
              required
              onChange={handleInputChange}
              placeholder="19"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.info}>
            <label>Engine</label>
            <input
              name="engine"
              type="number"
              step="0.1"
              value={carData.engine}
              required
              onChange={handleInputChange}
              placeholder="5.0"
            />
          </div>
          <div className={styles.info}>
            <label>Gearbox</label>
            <input
              name="gearbox"
              value={carData.gearbox}
              onChange={handleInputChange}
              required
              placeholder="6-Speed SelectShift"
            />
          </div>
          <div className={styles.info}>
            <label>Transmission</label>
            <input
              name="transmission"
              value={carData.transmission}
              required
              onChange={handleInputChange}
              placeholder="Automatic"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.info}>
            <label>Color</label>
            <input
              name="colour"
              value={carData.colour}
              required
              onChange={handleInputChange}
              placeholder="Black"
            />
          </div>
          <div className={styles.info}>
            <label>Interior</label>
            <input
              name="interior"
              value={carData.interior}
              required
              onChange={handleInputChange}
              placeholder="Cream Oakwood Interior"
            />
          </div>
          <div className={styles.info}>
            <label>Wheel</label>
            <input
              name="wheel"
              value={carData.wheel}
              required
              onChange={handleInputChange}
              placeholder="18'' Aluminium Wheels"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.info}>
            <label>Cylinders</label>
            <input
              name="cylinders"
              type="number"
              min="0"
              max="16"
              value={carData.cylinders}
              required
              onChange={handleInputChange}
              placeholder="8"
            />
          </div>
          <div className={styles.info}>
            <label>Drivetrain</label>
            <input
              name="drivetrain"
              value={carData.drivetrain}
              required
              onChange={handleInputChange}
              placeholder="RWD"
            />
          </div>
        </div>

        <div className={styles.info}>
          <label>Performance</label>
          <input
            name="performance"
            value={carData.performance}
            required
            onChange={handleInputChange}
            placeholder="Performance Description"
          />
        </div>

        <div className={styles.info}>
          <label>Safety</label>
          <input
            name="safety"
            value={carData.safety}
            onChange={handleInputChange}
            placeholder="Safety Description"
          />
        </div>

        <div className={styles.info}>
          <label>Technology</label>
          <input
            name="technology"
            value={carData.technology}
            required
            onChange={handleInputChange}
            placeholder="Technology Info"
          />
        </div>

        <div className={styles.info}>
          <label>Description</label>
          <textarea
            name="description"
            value={carData.description}
            onChange={handleInputChange}
            placeholder="Description Info"
          />
        </div>

        <div className={styles.btns}>
          <button type="submit" className={styles.save}>
            Update
          </button>
        </div>
      </form>
      {/* Processing dialog */}
      {showProcessingDialog && (
        <div className={styles.processingDialog}>
          <div className={styles.info}>
            <div className={styles.req}>
              <p>
                <b>&#x2705; Details have been updated...</b>
              </p>
            </div>
            <div className={styles.dash}>
              <p>You can check it in the dashboard.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditGasCar;