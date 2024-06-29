import React, { useState } from 'react';
import styles from './orders.module.css';
import t3p from '../Assets/t3p.png';

const OrderDetails = () => {
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
            description: 'Model 3 comes with the option of dual motor all-wheel drive, Performance Wheels and Brakes for total control, in all weather conditions and a spoiler improves stability at high speeds allowing Model 3 to accelerate from 0-60 mph in as little as 3.2 seconds.',
            status: "Sold"
        },
        {
            id: 2,
            image: t3p,
            model: 'Tesla Model 3 Standard Plus',
            year: '2020',
            price: '41,000',
            topSpeed: '140',
            time60: '5.3',
            range: '250',
            color: 'Pearl White Paint',
            interior: 'Black Premium Interior',
            wheel: "18'' Aero Wheels",
            description: 'Model 3 comes with the option of dual motor all-wheel drive, Performance Wheels and Brakes for total control, in all weather conditions and a spoiler improves stability at high speeds allowing Model 3 to accelerate from 0-60 mph in as little as 3.2 seconds.',
            status: "Not Sold"
        },
        {
            id: 3,
            image: t3p,
            model: 'Tesla Model S Performance',
            year: '2020',
            price: '102,000',
            topSpeed: '165',
            time60: '2.4',
            range: '348',
            color: 'Red Metallic Paint',
            interior: 'Black Premium Interior',
            wheel: "20'' Silver Alloy Wheels",
            description: "Model S sets an industry standard for performance and safety. Telsa's all-electric powertrain delivers unparalleled performance in all weather conditions - with Dual Motor All-Wheel Drive, adaptive air suspension and ludicrous acceleration.",
            status: "Not Sold"
        },
        {
            id: 4,
            image: t3p,
            model: 'Tesla Model S Long Range',
            year: '2020',
            price: '81,000',
            topSpeed: '155',
            time60: '3.7',
            range: '391',
            color: 'Matte Grey Paint',
            interior: 'Dark Ash Wood Interior',
            wheel: "19'' Tempest Wheels",
            description: "Model S sets an industry standard for performance and safety. Telsa's all-electric powertrain delivers unparalleled performance in all weather conditions - with Dual Motor All-Wheel Drive, adaptive air suspension and ludicrous acceleration.",
            status: "Sold"
        }
    ]);


    return (
        <div className={styles.OrderDetails}>
            <h2>Order Details</h2>
            <p>Here you can find your order details...</p>
                        {data.length > 0 && (
                            <button className={styles.button}>Buy More</button>
                        )}
                        {data.length === 0 && (
                            <button className={styles.button}>Start Buying</button>
                        )}
                        <div className={styles.cardsContainer}>
                            {data.map(car => (
                                <div key={car.id} className={styles.card}>
                                    <img className={styles.car_img} src={car.image} alt={car.model} />
                                    <div className={styles.car_details}>
                                        <div className={styles.car_title}>{car.year} {car.model}</div>
                                        <div className={styles.others}>
                                            <div>Electric</div>
                                            <div>Top speed {car.topSpeed}</div>
                                            <div className={styles.color}>{car.color}</div>
                                        </div>
                                        <div className={styles.price}>Rs.{car.price}</div>
                                    </div>
                                    <div className={styles.bttns}>
                                        
                                        <button className={styles.view}>View</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>         
    );
}

export default OrderDetails;
