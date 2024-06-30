import React, { useState, useContext, useEffect } from 'react';
import { Link,Navigate } from 'react-router-dom';
import axios from 'axios';
import { store } from '../App';
import styles from '../components/Dashboard/User.module.css'; 
import logo from '../components/Assets/logo.png';
import t3p from '../components/Assets/t3p.png';
import OrderDetails from './Orders.jsx';

function User() {
    const [isOrderOpen, setOrderOpen] = useState(true);
    const openOrder = () => setOrderOpen(true);
    const closeOrder = () => setOrderOpen(false);
    const [token, setToken] = useContext(store);
    const [userdata, setUserData] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        if (!token) return;

        axios.get('http://localhost:8080/api/myprofile', {
            headers: {
                'x-token': token
            }
        }).then(res => setUserData(res.data))
          .catch(err => console.log(err));
    }, [token]);

    useEffect(() => {
        if (!token || !userdata) return;

        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/orders', {
                    headers: {
                        'x-token': token,
                        'x-user-id': userdata._id
                    }
                });
                setOrderDetails(response.data);
                console.log(response.data);
                console.log(`Order details:${orderDetails}`)
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [token, userdata]);

    if (!token) {
        return <Navigate to='/sign' />;
    }

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

    const startSelling = () => {
        console.log('Start selling');
    };

    const sellAgain = () => {
        console.log('Sell again');
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <img className={styles.logo} src={logo} alt="Logo" />
                <div className={`${styles.orders} ${isOrderOpen ? styles.selected : ''}`} onClick={openOrder}>Orders</div>
                <div className={`${styles.sales} ${!isOrderOpen ? styles.selected : ''}`} onClick={closeOrder}>Sell</div>
                <Link to="/dashboard-buyer"><div>Requests</div></Link>
                <button className={styles.welcome}>Welcome User</button>
            </div>
            <div className={styles.details}>
                {isOrderOpen ? (
                    <OrderDetails orderDetails={orderDetails} />
                ) : (
                    <div className={styles.salesDetails}>
                        <h2>Sales</h2>
                        <p>Here you can find the sales information...</p>
                        {data.length > 0 ? (
                            <>
                                <button onClick={sellAgain} className={styles.button}>Sell Again</button>
                                <div className={styles.tableContainer}>
                                    <table className={styles.table}>
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
                                                <th>Status</th>
                                                <th>Buyer Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map(car => (
                                                <tr key={car.id}>
                                                    <td>
                                                        <img className={styles.image} src={car.image} alt={car.model} />
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
                                                    <td>{car.status}</td>
                                                    <td>
                                                        <button className={styles.view}>View</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <button onClick={startSelling} className={styles.button}>Start Selling</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default User;
