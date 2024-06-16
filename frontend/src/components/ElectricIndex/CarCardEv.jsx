import React from 'react'
import styles from './CarCard.module.css'
export const CarCardEv = (props) => {
  return (
    <div className={styles.card}>
        <div className={styles.title}>{props.year} {props.title}</div>
       <div className={styles.img_div}><img className={styles.img} src={props.image} ></img></div>
       
        <div className={styles.details_div}>
            <div className={styles.detail}>
                <div>Top Speed</div>
                <div>{props.topspeed}</div>
            </div>
            <div className={styles.detail}>
                <div>0-60mph</div>
                <div>{props.time60}</div>
            </div>
            <div className={styles.detail}>
                <div>Range</div>
                <div>{props.range}</div>
            </div>
        </div>
        <div className={styles.features_div}>
            <div class="grid-item">{props.colour}</div>
            <div class="grid-item">{props.interior}</div>
            <div class="grid-item">AutoPilot</div>
            <div class="grid-item">Premium Connectivity</div>
            <div class="grid-item">{props.wheel}</div>
            
        </div>
        <p>
        {props.description}
        </p>
        <div className={styles.cost_div}>
            <div className={styles.cost}>
                ${props.price}
            </div>
            <button className={styles.book}>
                Book Now
            </button>
        </div>
    </div>
  )
}
