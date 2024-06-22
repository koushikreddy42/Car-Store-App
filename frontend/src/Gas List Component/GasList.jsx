import React, { useState } from 'react';
import gas1 from '../assets/images/gas1.png';
import gas2 from '../assets/images/gas2.png';
import gas3 from '../assets/images/gas3.png';
import gas4 from '../assets/images/gas4.png';
import styles from './GasList.module.css';

function GasList(){
    const [data, setData] = useState([
        {
            id: 1,
            image: gas1,
            model: '2018 Alfa Romeo Stelvio',
            year: '2018',
            price: '48,600',
            topSpeed: '144',
            time60: '5.4',
            mileage: '24',
            engine: '2',
            gearbox: '8-Speed',
            transmission: 'Automatic',
            color: 'Montecarlo Blue',
            interior: 'Black Leather Interior',
            wheel: "18'' Spoke Wheels",
            description: 'The Stelvio delivers uncompromising performance with an engine that produces Best-in-Class standard 280 horsepower and Best-in-Class standard 306 pound-feet torque for a heart-racing Best-in-Class 5.4-second 0-60 mph time with all-wheel-drive models.'
        },
        {
            id: 2,
            image: gas2,
            model: '2020 Audi A6',
            year: '2020',
            price: '53,900',
            topSpeed: '155',
            time60: '5.3',
            mileage: '22',
            engine: '3',
            gearbox: '7-Speed Dual-Clutch',
            transmission: 'Automatic',
            color: 'Daytona Gray',
            interior: 'Black Interior',
            wheel: "20'' 5-V Wheels",
            description: 'The Audi A6 Sedan combines these values into an exceptionally sporty and elegant symbiosis. The Audi TFSI engines represent outstanding efficiency and improved performance while at the same time retaining their dynamism. The 2.0 TFSI 180 kW (245 bhp) in combination with the 7 Speed gearbox accelerates from 0 to 60 km/h in just 5.3 seconds.'
        },
        {
            id: 3,
            image: gas3,
            model: '2017 Fiat 124 Spider',
            year: '2017',
            price: '27,300',
            topSpeed: '141',
            time60: '6.4',
            mileage: '29',
            engine: '1.4',
            gearbox: '6-Speed',
            transmission: 'Manual',
            color: 'Meteor Grey',
            interior: 'Nero Black Interior',
            wheel: "16'' Silver Wheels",
            description: 'The FIAT 1.4L MultiAir Turbo four-cylinder with twin intercoolers delivers up to 164 hp and 184 lb-ft of torque, and can be teamed with either the standard six-speed manual or available six-speed automatic transmission. The FIAT 124 Spider gets to peak power and torque at a much lower rpm than any vehicle in its class.'
        },
        {
            id: 4,
            image: gas4,
            model: '2017 Jeep Cherokee',
            year: '2017',
            price: '25,200',
            topSpeed: '180',
            time60: '7.6',
            mileage: '25',
            engine: '2.4',
            gearbox: '9-Speed',
            transmission: 'Automatic',
            color: 'Billet Silver',
            interior: 'Cloth Bucket Interior',
            wheel: "16'' Silver Wheels",
            description: 'The available 2.0L Turbo engine provides an impressive 270 horsepower when equipped with a nine-speed automatic transmission. 295 pound-feet of torque gives the 2.0L Turbo engine a towing capacity of up to 4,000 pounds and a fuel economy rating of up to 31 highway mpg.'
        }
    ]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            setData(data.filter(item => item.id !== id));
        }
    };

    return(
      <div className={styles.record_list}>
        <table>
                <tbody>
                    <tr>
                        <td>
                            <h3>Gas Cars</h3>
                        </td>
                        <td className={styles.btns}></td>
                        <td className={styles.buttons}>
                            <button className={styles.btn_dark}><a href="#addgas">Add Gas</a></button>
                            <button className={styles.btn_dark}><a href="#admin">Admin</a></button>
                        </td>
                    </tr>
                </tbody>
        </table>    
        <div className = {styles.tabular}>    
        <table className={`${styles.table} ${styles.tableStriped}`}>
            <thead>
                <tr>
                    <th>Img</th>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Top Speed</th>
                    <th>Time 60</th>
                    <th>Mileage</th>
                    <th>Engine</th>
                    <th>Gearbox</th>
                    <th>Transmission</th>
                    <th>Colour</th>
                    <th>Interior</th>
                    <th>Wheel</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {data.map(car => (
                  <tr key={car.id}>
                    <td>
                        <img className={styles.image} src={car.image} alt={`carImg${car.id}`} />
                    </td>
                    <td>{car.model}</td>
                    <td>{car.year}</td>
                    <td>{car.price}</td>
                    <td>{car.topSpeed}</td>
                    <td>{car.time60}</td>
                    <td>{car.mileage}</td>
                    <td>{car.engine}</td>
                    <td>{car.gearbox}</td>
                    <td>{car.transmission}</td>
                    <td>{car.color}</td>
                    <td>{car.interior}</td>
                    <td>{car.wheel}</td>
                    <td>{car.description}</td>
                    <td>
                       <button className={styles.btn} onClick={() => handleDelete(car.id)}>
                          <i className="fa-regular fa-trash-can"></i> Delete
                       </button>
                    </td>
                  </tr>

                ))}
                
            </tbody>
        </table>
        </div>  
      </div>
    );
}
export default GasList;