import React, { useState,useContext,useEffect } from 'react';
import { store } from '../App';
import { Navigate,Link } from 'react-router-dom';
import axios from 'axios'
import styles from '../components/List/ElectricList.module.css';

function ElectricList(){
    const [data, setData] = useState([]);
    const [adminToken,setAdminToken]=useContext(store)
    const [tokendata,setTokenData]=useState(null)
    if(!adminToken){
        return <Navigate to='/admin-sign'/>
    }
    useEffect(()=>{
        axios.get('http://localhost:8080/api/admin-myprofile',{
                headers:{
                    'x-token':adminToken
                }
            }).then(res=>setTokenData(res.tokendata)).catch(err=>console.log(err))
    },[])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/electric-list");
      setData(response.data);
    } catch (error) {
      console.error('Error retrieving electric car data:', error);
    }
  };
  const handleAccept = async (carId) => {
    try {
      await axios.put(`http://localhost:8080/api/electric-list/accept/${carId}`);
      setData(d => d.filter(car => car._id !== carId));
    } catch (error) {
      console.error('Error accepting car:', error);
    }
  };

  const handleDecline = async (carId) => {
    try {
      await axios.delete(`http://localhost:8080/api/electric-list/decline/${carId}`);
      setData(d => d.filter(car => car._id !== carId));
    } catch (error) {
      console.error('Error declining car:', error);
    }
  };
    return(
    <div className="bodyy">
       <div className={styles.record_list}>
            <div className={styles.header}>
                <h3> Electric Cars </h3>
            </div>       
        <table className={`${styles.table} ${styles.tableStriped}`}>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Image</th>
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
                  <tr key={car._id}>
                    <td>{car.addedBy.username}</td>
                    <td>
                        <img className={styles.image} src={car.image} alt={`carImg${car.id}`} />
                    </td>
                    <td>{car.title}</td>
                    <td>{car.year}</td>
                    <td>{car.price}</td>
                    <td>{car.topspeed}</td>
                    <td>{car.time60}</td>
                    <td>{car.range}</td>
                    <td>{car.colour}</td>
                    <td>{car.interior}</td>
                    <td>{car.wheel}</td>
                    <td>{car.description}</td>
                    <td>
                       <button className={styles.acceptbtn} onClick={() => handleAccept(car._id)}>
                          Accept
                       </button>
                    </td>
                    <td>
                       <button className={styles.declinebtn} onClick={() => handleDecline(car._id)}>
                          Decline
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
export default ElectricList;