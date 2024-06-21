import React from 'react';
import styles from './wishlist.module.css'
import t3p from '../Assets/t3p.png';
import wish from '../Assets/wishlist.png'



function Wishlist(){
    return(
 <div className={styles.page}>
    
    <div className={styles.title}>
          ~ Wishlist
          </div>
    
    <div className={styles.listbox}>
    <div className={styles.count}><img className={styles.wish}  src={wish}/> Number of items in your list: 3</div>
       <div className={styles.product}>
        <img className={styles.car_img}  src={t3p} ></img>
        <div className={styles.car_details}>
        <div className={styles.car_title}>2020 Tesla Model 3</div>
        <div className={styles.others}>
        <div>Electric</div>
        <div>Top speed 4.8</div>
        <div className={styles.color}>Black opium</div>
        </div>
        <div className={styles.price}>Rs.2,00,000</div>
        </div>
        <div className={styles.bttns}>
        <button className={styles.remove}>Remove</button>
        <button className={styles.view}>View</button>
        </div>
        
        </div>
        <div className={styles.product}>
        <img className={styles.car_img}  src={t3p} ></img>
        <div className={styles.car_details}>
        <div className={styles.car_title}>2020 Tesla Model 3</div>
        <div className={styles.others}>
        <div>Electric</div>
        <div>Top speed 4.8</div>
        <div className={styles.color}>Black opium</div>
        </div>
        <div className={styles.price}>Rs.2,00,000</div>
        
        </div> 
        <div className={styles.bttns}>
        <button className={styles.remove}>Remove</button>
        <button className={styles.view}>View</button>
        </div>

        
        </div>
        <div className={styles.product}>
        <img className={styles.car_img}  src={t3p} ></img>
        <div className={styles.car_details}>
        <div className={styles.car_title}>2020 Tesla Model 3</div>
        <div className={styles.others}>
        <div>Electric</div>
        <div>Top speed 4.8</div>
        <div className={styles.color}>Black opium</div>
        </div>
        <div className={styles.price}>Rs.2,00,000</div>
        </div>
        <div className={styles.bttns}>
        <button className={styles.remove}>Remove</button>
        <button className={styles.view}>View</button>
        </div>
        
        </div>
    </div>
</div>
    );
}
export default Wishlist;