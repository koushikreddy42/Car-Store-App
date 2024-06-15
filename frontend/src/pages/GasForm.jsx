import { useState } from 'react';
import styles from '../components/Forms/GasForm.module.css';

function GasForm() {
  const [imagePath, setImagePath] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [topSpeed, setTopSpeed] = useState('');
  const [time60, setTime60] = useState('');
  const [mileage, setMileage] = useState('');
  const [color, setColor] = useState('');
  const [engine, setEngine] = useState('');
  const [gearbox, setGearbox] = useState('');
  const [transmission, setTransmission] = useState('');
  const [interior, setInterior] = useState('');
  const [wheel, setWheel] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => { 
    e.preventDefault();
    // Handle form submission with the state values
    console.log({
      imagePath,
      title,
      year,
      price,
      topSpeed,
      time60,
      mileage,
      color,
      engine,
      gearbox,
      transmission,
      interior,
      wheel,
      description,
    });
  };

  return (
    <div className={styles.page}>
      <form className={styles.gasform} onSubmit={handleSubmit}>
        <div className={styles.lines}>
          <h1 className={styles.heading}>Add Gas</h1>
        </div>

        <div className={styles.row}>
          <div className={styles.path}>
            <label>ImagePath(image/filename.extension)</label>
            <div>
              <input
                placeholder="images/1.jpg"
                value={imagePath}
                onChange={(e) => setImagePath(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.upload}>
            <label className={styles.upload_text}>Upload image</label>
            <div>
              <input type="file" accept="image/*" />
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.title}>
            <label>Title</label>
            <div>
              <input
                placeholder="2019 Ford Mustang"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.year}>
            <label>Year</label>
            <div>
              <input
                type="number"
                max={2024}
                min={1990}
                placeholder="2024"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.price}>
            <label>Price</label>
            <div>
              <input
                type="text"
                placeholder="58,100"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.speed}>
            <label>Top Speed</label>
            <div>
              <input
                type="text"
                placeholder="185"
                value={topSpeed}
                onChange={(e) => setTopSpeed(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.time}>
            <label>Time60</label>
            <div>
              <input
                type="text"
                placeholder="3.8"
                value={time60}
                onChange={(e) => setTime60(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.mileage}>
            <label>Mileage</label>
            <div>
              <input
                type="text"
                placeholder="19"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.color}>
            <label>Color</label>
            <div>
              <input
                type="text"
                placeholder="Black"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.engine}>
            <label>Engine</label>
            <div>
              <input
                type="number"
                step={0.1}
                name="engine"
                placeholder="5.0"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.gearbox}>
            <label>Gearbox</label>
            <input
              type="text"
              placeholder="6-Speed SelectShift"
              value={gearbox}
              onChange={(e) => setGearbox(e.target.value)}
            />
          </div>
          <div className={styles.transmission}>
            <label>Transmission</label>
            <input
              type="text"
              placeholder="Automatic"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.interior}>
            <label>Interior</label>
            <input
              type="text"
              placeholder="Cream Oakwood Interior"
              value={interior}
              onChange={(e) => setInterior(e.target.value)}
            />
          </div>

          <div className={styles.wheel}>
            <label>Wheel</label>
            <input
              type="text"
              placeholder="18'' Aluminium Wheels"
              value={wheel}
              onChange={(e) => setWheel(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.description}>
          <label>Description</label>
          <input
            type="text"
            placeholder="Description Info"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="btns">
          <button type="submit" className={styles.save}>
            Save
          </button>
          <button className={styles.back}>Back</button>
        </div>
      </form>
    </div>
  );
}

export default GasForm;