import React, { useState } from 'react';
import t3p from '../assets/images/t3p.png';
import Image2 from '../assets/images/Image2.png';
import Image3 from '../assets/images/Image3.png';
import Image4 from '../assets/images/Image4.png';
import styles from './ElectricList.module.css';

function ElectricList(){
    const [data, setData] = useState([
        {
            id: 1,
            image: t3p,
            model: 'Tesla Model 3 Performance',
            year: '2020',
            price: '54,000',
            topSpeed: '162',
            time60: '3.2',
            range: '300',
            color: 'Solid Black Paint',
            interior: 'Black Premium Interior',
            wheel: "20'' Aero Wheels",
            description: 'Model 3 comes with the option of dual motor all-wheel drive, Performance Wheels and Brakes for total control, in all weather conditions and a spoiler improves stability at high speeds allowing Model 3 to accelerate from 0-60 mph in as little as 3.2 seconds.'
        },
        {
            id: 2,
            image: Image2,
            model: 'Tesla Model 3 Standard Plus',
            year: '2020',
            price: '41,000',
            topSpeed: '140',
            time60: '5.3',
            range: '250',
            color: 'Pearl White Paint',
            interior: 'Black Premium Interior',
            wheel: "18'' Aero Wheels",
            description: 'Model 3 comes with the option of dual motor all-wheel drive, Performance Wheels and Brakes for total control, in all weather conditions and a spoiler improves stability at high speeds allowing Model 3 to accelerate from 0-60 mph in as little as 3.2 seconds.'
        },
        {
            id: 3,
            image: Image3,
            model: 'Tesla Model S Performance',
            year: '2020',
            price: '102,000',
            topSpeed: '165',
            time60: '2.4',
            range: '348',
            color: 'Red Metallic Paint',
            interior: 'Black Premium Interior',
            wheel: "20'' Silver Alloy Wheels",
            description: "Model S sets an industry standard for performance and safety. Telsa's all-electric powertrain delivers unparalleled performance in all weather conditions - with Dual Motor All-Wheel Drive, adaptive air suspension and ludicrous acceleration."
        },
        {
            id: 4,
            image: Image4,
            model: 'Tesla Model S Long Range',
            year: '2020',
            price: '81,000',
            topSpeed: '155',
            time60: '3.7',
            range: '391',
            color: 'Matte Grey Paint',
            interior: 'Dark Ash Wood Interior',
            wheel: "19'' Tempest Wheels",
            description: "Model S sets an industry standard for performance and safety. Telsa's all-electric powertrain delivers unparalleled performance in all weather conditions - with Dual Motor All-Wheel Drive, adaptive air suspension and ludicrous acceleration."
        }
    ]);
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            setData(data.filter(item => item.id !== id));
        }
    };

    return(
       <div className={styles.record_list}>
            <div className={styles.header}>
                <h3> Electric Cars </h3>
                    
                <button><a className={styles.btn1} href="#">Add Electric</a></button>
                <button><a className={styles.btn2} href="#">Admin</a></button>
            </div>       
        <table className={`${styles.table} ${styles.tableStriped}`}>
            <thead>
                <tr>
                    <th>Img</th>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Top Speed</th>
                    <th>Time 60</th>
                    <th>Range</th>
                    <th>Color</th>
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
                    <td>{car.range}</td>
                    <td>{car.color}</td>
                    <td>{car.interior}</td>
                    <td>{car.wheel}</td>
                    <td>{car.description}</td>
                    <td><button className={styles.btn} onClick={() => handleDelete(car.id)}>
                        <i className="fa-regular fa-trash-can"></i> Delete
                        </button>
                    </td>
                  </tr>

                ))}
                
            </tbody>
        </table>
       </div>
    );
}
export default ElectricList;