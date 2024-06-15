import React from 'react';
import gas1 from './assets/images/gas1.png';
import gas2 from './assets/images/gas2.png';
import gas3 from './assets/images/gas3.png';
import gas4 from './assets/images/gas4.png';
import styles from './GasList.module.css';

function GasList(){

    return(
       <div className={styles.record_list}>
            <div className={styles.header}>
                <h3> Gas Cars </h3>
                    
                <button><a className={styles.btn1} href="#">Add Gas</a></button>
                <button><a className={styles.btn2} href="#">Admin</a></button>
            </div> 
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
                <tr>
                    <td>
                        <img className={styles.image} src ={gas1} alt="carImg1" /> 
                    </td>
                    <td>2018 Alfa Romeo Stelvio</td>
                    <td>2018</td>
                    <td>48,600</td>
                    <td>144</td>
                    <td>5.4</td>
                    <td>24</td>
                    <td>2</td>
                    <td>8-Speed</td>
                    <td>Automatic</td>
                    <td>Montecarlo Blue</td>
                    <td>Black Leather Interior</td>
                    <td>18'' Spoke Wheels</td>
                    <td className={styles.desc}>"The Stelvio delivers uncompromising performance with an engine that produces Best-in-Class standard 280 horsepower and Best-in-Class standard 306 pound-feet torque for a heart-racing Best-in-Class 5.4-second 0-60 mph time with all-wheel-drive models." </td>
                    <td>
                        <button className={styles.btn}><a href ="#" onclick="return confirm('Are you sure to delete this record?')"><i class="fa-regular fa-trash-can"></i>Delete</a></button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img className={styles.image} src ={gas2} alt="carImg2" /> 
                    </td>
                    <td>2020 Audi A6</td>
                    <td>2020</td>
                    <td>53900</td>
                    <td>155</td>
                    <td>5.3</td>
                    <td>22</td>
                    <td>3</td>
                    <td>7-Speed Dual-Clutch</td>
                    <td>Automatic</td>
                    <td>Daytona Gray</td>
                    <td>Black Interior</td>
                    <td>20'' 5-V Wheels</td>
                    <td>"The Audi A6 Sedan combines these values into an exceptionally sporty and elegant symbiosis. The Audi TFSI engines represent outstanding efficiency and improved performance while at the same time retaining their dynamism. The 2.0 TFSI 180 kW (245 bhp) in combination with the 7 Speed gearbox accelerates from 0 to 60 km/h in just 5.3 seconds." </td>
                    <td>
                        <button className={styles.btn}><a href ="#" onclick="return confirm('Are you sure to delete this record?')"><i class="fa-regular fa-trash-can"></i>Delete</a></button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img className={styles.image} src ={gas3} alt="carImg3" /> 
                    </td>
                    <td>2017 Fiat 124Spider</td>
                    <td>2017</td>
                    <td>27,300</td>
                    <td>141</td>
                    <td>6.4</td>
                    <td>29</td>
                    <td>1.4</td>
                    <td>6-Speed</td>
                    <td>Manual</td>
                    <td>Meteor Grey</td>
                    <td>Nero Black Interior</td>
                    <td>16'' Silver Wheels</td>
                    <td>"The FIAT 1.4L MultiAir Turbo four-cylinder with twin intercoolers delivers up to 164 hp and 184 lb-ft of torque, and can be teamed with either the standard six-speed manual or available six-speed automatic transmission. The FIAT 124 Spider gets to peak power and torque at a much lower rpm than any vehicle in its class." </td>
                    <td>
                        <button className={styles.btn}><a href ="#" onclick="return confirm('Are you sure to delete this record?')"><i class="fa-regular fa-trash-can"></i>Delete</a></button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img className={styles.image} src ={gas4} alt="carImg4" /> 
                    </td>
                    <td>2017 Jeep Cherokee</td>
                    <td>2017</td>
                    <td>25,200</td>
                    <td>180</td>
                    <td>7.6</td>
                    <td>25</td>
                    <td>2.4</td>
                    <td>9-Speed</td>
                    <td>Automatic</td>
                    <td>Billet Silver</td>
                    <td>Cloth Bucket Interior</td>
                    <td>16'' Silver Wheels</td>
                    <td>"The available 2.0L Turbo engine provides an impressive 270 horsepower when equipped with a nine-speed automatic transmission. 295 pound-feet of torque gives the 2.0L Turbo engine a towing capacity of up to 4,000 pounds and a fuel economy rating of up to 31 highway mpg." </td>
                    <td>
                        <button className={styles.btn}><a href ="#" onclick="return confirm('Are you sure to delete this record?')"><i class="fa-regular fa-trash-can"></i>Delete</a></button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>  
       </div>
    );
}
export default GasList;