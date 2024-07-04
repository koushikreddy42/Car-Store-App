import { useState, useContext, useEffect } from "react";
import styles from "../Forms/EvsForm.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { store } from "../App";
import { Link } from "react-router-dom";

function Edit() {
  const [formData, setFormData] = useState({
    image: "",
    model: "",
    year: "",
    performance: "",
    price: "",
    topSpeed: "",
    time60: "",
    range: "",
    color: "",
    interior: "",
    wheel: "",
    description: "",
  });
  const { id } = useParams();
  const { userdata } = useContext(store);

  useEffect(() => {
    const fetchData = async () => {
      if (userdata) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/owner-cars?userId=${userdata._id}`
          );
          const { electricCars, gasCars } = response.data;

          const combinedData = [...electricCars, ...gasCars].find(
            (car) => car._id === id
          );
          setFormData({
            image: combinedData.image,
            model: combinedData.title,
            year: combinedData.year,
            performance: combinedData.performance,
            price: combinedData.price,
            topSpeed: combinedData.topspeed,
            time60: combinedData.time60,
            range: combinedData.range,
            color: combinedData.colour,
            interior: combinedData.interior,
            wheel: combinedData.wheel,
            description: combinedData.description,
          });
        } catch (err) {
          console.error("Error fetching cars:", err);
        }
      }
    };

    fetchData();
  }, [userdata, id]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFormData({ ...formData, image: base64 });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/owner-cars/${id}`, formData);
      console.log("Car details updated successfully");
    } catch (err) {
      console.error("Error updating car details:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.page}>
      <form className={styles.evsform} onSubmit={handleUpdate}>
        <div className={styles.box}>
          <h1 className={styles.heading}>Edit Details</h1>
        </div>

        <div className={styles.row}>
          <div className={styles.info}>
            <label className={styles.upload_text}>Upload image</label>
            <div>
              <input
                type="file"
                name="image"
                id="file-upload"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileUpload}
              />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.info}>
            <label>Title</label>
            <div>
              <input
                name="model"
                placeholder="Tesla Model Y Long Range AWD"
                value={formData.model}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.info}>
            <label>Year</label>
            <div>
              <input
                name="year"
                type="number"
                max={2024}
                min={1990}
                placeholder="2024"
                value={formData.year}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.info}>
            <label>Performance</label>
            <div>
              <input
                name="performance"
                type="text"
                placeholder="Performance Description"
                value={formData.performance}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.info}>
            <label>Price</label>
            <div>
              <input
                name="price"
                type="text"
                placeholder="54,000"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.info}>
            <label>Top Speed</label>
            <div>
              <input
                name="topSpeed"
                type="text"
                placeholder="135"
                value={formData.topSpeed}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.info}>
            <label>Time 0-60</label>
            <div>
              <input
                name="time60"
                type="text"
                placeholder="4.8"
                value={formData.time60}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.info}>
            <label>Range</label>
            <input
              name="range"
              type="text"
              placeholder="346"
              value={formData.range}
              onChange={handleChange}
            />
          </div>
          <div className={styles.info}>
            <label>Color</label>
            <input
              name="color"
              type="text"
              placeholder="Black"
              value={formData.color}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.info}>
            <label>Interior</label>
            <input
              name="interior"
              type="text"
              placeholder="Cream Oakwood Interior"
              value={formData.interior}
              onChange={handleChange}
            />
          </div>
          <div className={styles.info}>
            <label>Wheel</label>
            <input
              name="wheel"
              type="text"
              placeholder="19'' Induction Wheels"
              value={formData.wheel}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.info}>
          <label>Description</label>
          <input
            name="description"
            type="text"
            placeholder="Description Info"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="btns">
          <Link to="/" type="submit" className={styles.save}>
            {" "}
            Save{" "}
          </Link>
          <Link to="/" className={styles.back}>
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Edit;

// Helper function to convert file to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
