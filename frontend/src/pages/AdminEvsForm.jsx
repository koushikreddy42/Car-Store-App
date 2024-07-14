import { useState, useContext, useEffect } from "react";
import styles from "../components/Forms/EvsForm.module.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { store } from "../App";

function AdminEvsForm() {
  const [imagePath, setImagePath] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [topspeed, setTopSpeed] = useState("");
  const [time60, setTime60] = useState("");
  const [range, setRange] = useState("");
  const [colour, setColor] = useState("");
  const [interior, setInterior] = useState("");
  const [wheel, setWheel] = useState("");
  const [description, setDescription] = useState("");
  const [rangedescription, setRangeDescription] = useState("");
  const [performance, setPerformance] = useState("");
  const [safety, setSafety] = useState("");
  const [technology, setTechnology] = useState("");
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
        range,
        colour,
        interior,
        wheel,
        description,
        rangedescription,
        technology,
        safety,
        performance,
        isAdmin: true,
      };
      setShowProcessingDialog(true);
      const response = await axios.post(
        "http://localhost:8080/api/electric-form",
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
      <form className={styles.evsform} onSubmit={handleSubmit}>
        <div className={styles.box}>
          <h1 className={styles.heading}>Add Electric</h1>
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
                placeholder="Tesla Model Y Long Range AWD"
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
        </div>
        <div className={styles.row}>
          <div className={styles.info}>
            <label>Price</label>
            <div>
              <input
                type="text"
                placeholder="54,000"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.info}>
            <label>Top Speed</label>
            <div>
              <input
                type="text"
                placeholder="135"
                value={topspeed}
                required
                onChange={(e) => setTopSpeed(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.info}>
            <label>Time60</label>
            <div>
              <input
                type="text"
                placeholder="4.8"
                value={time60}
                required
                onChange={(e) => setTime60(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.info}>
            <label>Range</label>

            <input
              type="text"
              placeholder="346"
              value={range}
              required
              onChange={(e) => setRange(e.target.value)}
            />
          </div>

          <div className={styles.info}>
            <label>Color</label>

            <input
              type="text"
              placeholder="Black"
              value={colour}
              required
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
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
              placeholder="19'' Induction Wheels"
              value={wheel}
              required
              onChange={(e) => setWheel(e.target.value)}
            />
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
          <label>RangeDesc</label>
          <div>
            <input
              type="text"
              placeholder="Range Description Info"
              value={rangedescription}
              onChange={(e) => setRangeDescription(e.target.value)}
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

export default AdminEvsForm;

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