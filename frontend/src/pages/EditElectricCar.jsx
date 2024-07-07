import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { store } from '../App';
import styles from '../components/Forms/EvsForm.module.css';

function EditElectricCar() {
  const [carData, setCarData] = useState(null);
  const [token] = useContext(store);
  const location = useLocation();
  const navigate = useNavigate();
  const carId = location.state?.carId;

  useEffect(() => {
    if (carId) {
      axios.get(`http://localhost:8080/api/get-electric-car/${carId}`, {
        headers: { 'x-token': token }
      })
      .then(res => setCarData(res.data))
      .catch(err => console.error(err));
    }
  }, [carId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/edit-electric-car/${carId}`, carData, {
        headers: { 'x-token': token }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  if (!carData) return <div>Loading...</div>;

  return (
    <div className={styles.page}>
      <form className={styles.evsform} onSubmit={handleSubmit}>
        <h1 className={styles.heading}>Edit Electric Car</h1>

        <div className={styles.row}>
          <div className={styles.info}>
            <label>Title</label>
            <input
              name="title"
              value={carData.title}
              onChange={handleInputChange}
              placeholder="Tesla Model Y Long Range AWD"
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
              onChange={handleInputChange}
              placeholder="2024"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.info}>
            <label>Price</label>
            <input
              name="price"
              type="number"
              value={carData.price}
              onChange={handleInputChange}
              placeholder="54000"
            />
          </div>
          <div className={styles.info}>
            <label>Top Speed</label>
            <input
              name="topspeed"
              value={carData.topspeed}
              onChange={handleInputChange}
              placeholder="135"
            />
          </div>
          <div className={styles.info}>
            <label>0-60 Time</label>
            <input
              name="time60"
              value={carData.time60}
              onChange={handleInputChange}
              placeholder="4.8"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.info}>
            <label>Range</label>
            <input
              name="range"
              value={carData.range}
              onChange={handleInputChange}
              placeholder="346"
            />
          </div>
          <div className={styles.info}>
            <label>Color</label>
            <input
              name="colour"
              value={carData.colour}
              onChange={handleInputChange}
              placeholder="Black"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.info}>
            <label>Interior</label>
            <input
              name="interior"
              value={carData.interior}
              onChange={handleInputChange}
              placeholder="Cream Oakwood Interior"
            />
          </div>
          <div className={styles.info}>
            <label>Wheel</label>
            <input
              name="wheel"
              value={carData.wheel}
              onChange={handleInputChange}
              placeholder="19'' Induction Wheels"
            />
          </div>
        </div>

        <div className={styles.info}>
          <label>Technology</label>
          <input
            name="technology"
            value={carData.technology}
            onChange={handleInputChange}
            placeholder="Technology Info"
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
          <label>Range Description</label>
          <input
            name="rangedescription"
            value={carData.rangedescription}
            onChange={handleInputChange}
            placeholder="Range Description Info"
          />
        </div>

        <div className={styles.info}>
          <label>Performance</label>
          <input
            name="performance"
            value={carData.performance}
            onChange={handleInputChange}
            placeholder="Performance Description"
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
          <button type="submit" className={styles.save}>Update</button>
          <button type="button" className={styles.back} >Back</button>
        </div>
      </form>
    </div>
  );
}

export default EditElectricCar;