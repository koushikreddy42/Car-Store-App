import React from 'react'
import './CarCard.css'
import bmw from '../Assets/bmw.jpg'
export const CarCard = (props) => {
  return (
    <div class="card">
        <div className="title">{props.year} {props.title}</div>
       <div className="img-div"><img src={bmw}></img></div>
       
        <div className="details-div">
            <div className="detail">
                <div>Top Speed</div>
                <div>{props.topspeed}</div>
            </div>
            <div className="detail">
                <div>0-60mph</div>
                <div>{props.time60}</div>
            </div>
            <div className="detail">
                <div>Range</div>
                <div>{props.range}</div>
            </div>
        </div>
        <div class="features-div">
            <div class="grid-item">{props.colour}</div>
            <div class="grid-item">{props.interior}</div>
            <div class="grid-item">AutoPilot</div>
            <div class="grid-item">Premium Connectivity</div>
            <div class="grid-item">{props.wheel}</div>
            
        </div>
        <p>
        {props.description}
        </p>
        <div className="cost-div">
            <div className="cost">
                ${props.price}
            </div>
            <button className="book">
                Book Now
            </button>
        </div>
    </div>
  )
}
