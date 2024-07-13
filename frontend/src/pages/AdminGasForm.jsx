import { useState, useContext, useEffect } from "react";
import styles from "../components/Forms/GasForm.module.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { store } from "../App";

function AdminGasForm() {
  const [imagePath, setImagePath] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [topspeed, setTopSpeed] = useState("");
  const [time60, setTime60] = useState("");
  const [mileage, setMileage] = useState("");
  const [colour, setColor] = useState("");
  const [engine, setEngine] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [transmission, setTransmission] = useState("");
  const [interior, setInterior] = useState("");
  const [wheel, setWheel] = useState("");
  const [description, setDescription] = useState("");
  const [performance, setPerformance] = useState("");
  const [safety, setSafety] = useState("");
  const [technology, setTechnology] = useState("");
  const [cylinders, setCylinders] = useState("");
  const [drivetrain, setDriveTrain] = useState("");
  const [postImage, setPostImage] = useState({ myFile: "" });
  const [adminToken, setAdminToken] = useContext(store);
  const [data, setData] = useState(null);
  const [showProcessingDialog, setShowProcessingDialog] = useState(false);
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
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        image: postImage.myFile,
        addedBy: data._id,
        title,
        year,
        price,
        topspeed,
        time60,
        mileage,
        colour,
        engine,
        gearbox,
        transmission,
        interior,
        wheel,
        safety,
        technology,
        performance,
        cylinders,
        drivetrain,
        description,
        isAdmin: true,
      };
      setShowProcessingDialog(true);
      const response = await axios.post(
        "http://localhost:8080/api/gas-form",
        formData
      );
      console.log(response.data);
      // Handle success or redirect to another page
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  return (
    <div className={styles.page}>
      <form className={styles.gasform} onSubmit={handleSubmit}>
        <div className={styles.lines}>
          <h1 className={styles.heading}>Add Gas</h1>
        </div>

        <div className={styles.row}>
          <div className={styles.info}>
            <label className={styles.upload_text}>Upload image</label>
            <div>
              <input
                type="file"
                lable="Image"
                name="myFile"
                id="file-upload"
                accept=".jpg, .jpeg, .png"
                required
                onChange={(e) => handleFileUpload(e)}
              />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.info}>
            <label>Title</label>
            <div>
              <input
                placeholder="2019 Ford Mustang"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.info}>
            <label>Year</label>
            <div>
              <input
                type="number"
                max={2024}
                min={1990}
                placeholder="2024"
                value={year}
                required
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.info}>
            <label>Price</label>
            <div>
              <input
                type="text"
                placeholder="58,100"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.info}>
            <label>Top Speed</label>
            <div>
              <input
                type="text"
                placeholder="185"
                value={topspeed}
                required
                onChange={(e) => setTopSpeed(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.info}>
            <label>Cylinders</label>
            <div>
              <input
                type="number"
                max={16}
                min={0}
                placeholder="11"
                value={cylinders}
                required
                onChange={(e) => setCylinders(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.info}>
            <label>Time60</label>
            <div>
              <input
                type="text"
                placeholder="3.8"
                value={time60}
                required
                onChange={(e) => setTime60(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.info}>
            <label>Mileage</label>
            <div>
              <input
                type="text"
                placeholder="19"
                value={mileage}
                required
                onChange={(e) => setMileage(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.info}>
            <label>Color</label>
            <div>
              <input
                type="text"
                placeholder="Black"
                value={colour}
                required
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.info}>
            <label>Engine</label>
            <div>
              <input
                type="number"
                step={0.1}
                name="engine"
                placeholder="5.0"
                value={engine}
                required
                onChange={(e) => setEngine(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.info}>
            <label>Drivetrain</label>
            <input
              type="text"
              placeholder="RWD"
              value={drivetrain}
              required
              onChange={(e) => setDriveTrain(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.info}>
            <label>Gearbox</label>
            <input
              type="text"
              placeholder="6-Speed SelectShift"
              value={gearbox}
              required
              onChange={(e) => setGearbox(e.target.value)}
            />
          </div>

          <div className={styles.info}>
            <label>Transmission</label>
            <input
              type="text"
              placeholder="Automatic"
              value={transmission}
              required
              onChange={(e) => setTransmission(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.info}>
            <label>Performance</label>
            <div>
              <input
                type="text"
                placeholder="Performance Description"
                value={performance}
                required
                onChange={(e) => setPerformance(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.info}>
            <label>Interior</label>
            <input
              type="text"
              placeholder="Cream Oakwood Interior"
              value={interior}
              required
              onChange={(e) => setInterior(e.target.value)}
            />
          </div>

          <div className={styles.info}>
            <label>Wheel</label>
            <input
              type="text"
              placeholder="18'' Aluminium Wheels"
              value={wheel}
              required
              onChange={(e) => setWheel(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.info}>
          <label>Safety</label>
          <div>
            <input
              type="text"
              placeholder="Safety Description"
              value={safety}
              onChange={(e) => setSafety(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.info}>
          <label>Technology</label>
          <div>
            <input
              type="text"
              placeholder="Technology Info"
              value={technology}
              required
              onChange={(e) => setTechnology(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.info}>
          <label>Description</label>
          <input
            type="text"
            placeholder="Description Info"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.btns}>
          <button type="submit" className={styles.save}>
            {" "}
            Save{" "}
          </button>
          <button className={styles.back}>Back</button>
        </div>
      </form>
      {showProcessingDialog && (
        <div className={styles.processingDialog}>
          <div className={styles.proIcon}>
            <i class="fa-regular fa-hourglass-half"></i>
          </div>
          <div className={styles.info}>
            <div className={styles.req}>
              <p>
                <b>&#x2705; Car has been added...</b>
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

export default AdminGasForm;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
