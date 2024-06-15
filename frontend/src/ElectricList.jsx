import React from 'react';
import t3p from './assets/images/t3p.png';
import Image2 from './assets/images/Image2.png';
import Image3 from './assets/images/Image3.png';
import Image4 from './assets/images/Image4.png';
import styles from './ElectricList.module.css';

function ElectricList(){

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
                <tr>
                    <td>
                        <img className={styles.image} src ={t3p} alt="carImg1" /> 
                    </td>
                    <td>Tesla Model 3 Performance</td>
                    <td>2020</td>
                    <td>54,000</td>
                    <td>162</td>
                    <td>3.2</td>
                    <td>300</td>
                    <td>Solid Black Paint</td>
                    <td>Black Premium Interior</td>
                    <td>20'' Aero Wheels</td>
                    <td>"Model 3 comes with the option of dual motor all-wheel drive, Performance Wheels and Brakes for total control, in all weather conditions and a spoiler improves stability at high speeds allowing Model 3 to accelerate from 0-60 mph in as little as 3.2 seconds." </td>
                    <td>
                        <button className={styles.btn}><a href ="#" onclick="return confirm('Are you sure to delete this record?')"><i class="fa-regular fa-trash-can"></i>Delete</a></button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img className={styles.image} src ={Image2} alt="carImg2" /> 
                    </td>
                    <td>Tesla Model 3 Standard Plus</td>
                    <td>2020</td>
                    <td>41,000</td>
                    <td>140</td>
                    <td>5.3</td>
                    <td>250</td>
                    <td>Pearl White Paint</td>
                    <td>Black Premium Interior</td>
                    <td>18'' Aero Wheels</td>
                    <td>"Model 3 comes with the option of dual motor all-wheel drive, Performance Wheels and Brakes for total control, in all weather conditions and a spoiler improves stability at high speeds allowing Model 3 to accelerate from 0-60 mph in as little as 3.2 seconds." </td>
                    <td>
                        <button className={styles.btn}><a href ="#" onclick="return confirm('Are you sure to delete this record?')"><i class="fa-regular fa-trash-can"></i>Delete</a></button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img className={styles.image} src ={Image3} alt="carImg3" /> 
                    </td>
                    <td>Tesla Model S Performance</td>
                    <td>2020</td>
                    <td>102,000</td>
                    <td>165</td>
                    <td>2.4</td>
                    <td>348</td>
                    <td>Red Metallic Paint</td>
                    <td>Black Premium Interior</td>
                    <td>20'' Silver Alloy Wheels</td>
                    <td>"Model S sets an industry standard for performance and safety. Telsa's all-electric powertrain delivers unparalleled performance in all weather conditions - with Dual Motor All-Wheel Drive, adaptive air suspension and ludicrous acceleration." </td>
                    <td>
                        <button className={styles.btn}><a href ="#" onclick="return confirm('Are you sure to delete this record?')"><i class="fa-regular fa-trash-can"></i>Delete</a></button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img className={styles.image} src ={Image4} alt="carImg4" /> 
                    </td>
                    <td>Tesla Model S Long Range</td>
                    <td>2020</td>
                    <td>81,000</td>
                    <td>155</td>
                    <td>3.7</td>
                    <td>391</td>
                    <td>Matte Grey Paint</td>
                    <td>Dark Ash Wood Interior</td>
                    <td>19'' Tempest Wheels</td>
                    <td>"Model S sets an industry standard for performance and safety. Telsa's all-electric powertrain delivers unparalleled performance in all weather conditions - with Dual Motor All-Wheel Drive, adaptive air suspension and ludicrous acceleration." </td>
                    <td>
                        <button className={styles.btn}><a href ="#" onclick="return confirm('Are you sure to delete this record?')"><i class="fa-regular fa-trash-can"></i>Delete</a></button>
                    </td>
                </tr>
            </tbody>
        </table>
       </div>
    );
}
export default ElectricList;