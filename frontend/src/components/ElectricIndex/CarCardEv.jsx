import React, { useState, useContext, useEffect } from 'react';
import { store } from '../../App';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import styles from './CarCard.module.css';
import { Link } from 'react-router-dom';
import { BsPaintBucket, BsJoystick } from 'react-icons/bs';
import { MdAirlineSeatReclineExtra, MdConnectedTv } from 'react-icons/md';
import { FaCarSide } from 'react-icons/fa';


export const CarCardEv = (props) => {
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const [token] = useContext(store);
  const [data, setData] = useState(null);
  // console.log({car:props.title,truth:props.isFavorite})
    
  useEffect(() => {
    axios.get('http://localhost:8080/api/myprofile', {
      headers: {
        'x-token': token
      }
    }).then(res => setData(res.data)).catch(err => console.log(err));
  }, [token]);

  // useEffect(() => {
  //   checkFavoriteStatus();
  // }, [props._id,token]);

  // const checkFavoriteStatus = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/favourites', {
  //       headers: {
  //         'x-token': token
  //       }
  //     });
  //     setIsFavorite(response.data.favorites.some(fav => fav._id === props._id));
  //   } catch (error) {
  //     console.error('Error checking favorite status:', error);
  //   }
  // };
  
  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.post('http://localhost:8080/api/remove-favourite', { carId: props._id }, {
          headers: {
            'x-token': token
          }
        });
      } else {
        await axios.post('http://localhost:8080/api/add-favourite', { carId: props._id, carType: 'electriccarmodel' }, {
          headers: {
            'x-token': token
          }
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const param1 = props._id;
  const param2='ev';
  const param3=isFavorite;
  
  console.log(props.ownerId)

  return (
    data&&
    <div className={styles.card}>
      <button
        onClick={toggleFavorite}
        style={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          border: 'none',
          padding: '8px',
          borderRadius: '50%',
        }}
      >
        {isFavorite ? (
          <AiFillHeart color="red" size={24} />
        ) : (
          <AiOutlineHeart color="#333" size={24} />
        )}
      </button>
      <div className="" style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <div className={styles.title}>{props.title}</div>
        <div className="" style={{fontSize:"19px"}}>
  {props.isAdmin ? "Owned by: Admin" : `Owned by: ${props.name}`}
</div>
      </div>
      <div className={styles.img_div}><img className={styles.img} src={props.image} alt={props.title} /></div>
      
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
  <div className="grid-item">
    <BsPaintBucket style={{marginRight: '5px'}} />
    {props.colour}
  </div>
  <div className="grid-item">
    <MdAirlineSeatReclineExtra style={{marginRight: '5px'}} />
    {props.interior}
  </div>
  <div className="grid-item">
    <BsJoystick style={{marginRight: '5px'}} />
    AutoPilot
  </div>
  <div className="grid-item">
    <MdConnectedTv style={{marginRight: '5px'}} />
    Premium Connectivity
  </div>
  <div className="grid-item">
    <FaCarSide style={{marginRight: '5px'}} />
    {props.wheel}
  </div>
</div>
      <p>
        {props.description}
      </p>
      <div className={styles.cost_div}>
        <div className={styles.cost}>
          ${props.price}
        </div>
        {
          props.isSold ? (
            <div className={styles.booked}>Sold</div>
          ):(
props.ownerId===data._id?(<div className={styles.booked}>In Sale</div>):(
<>
  <Link to={`/electric-booking/${param1}/${param2}/${param3}`}>
    <button className={styles.book}>Book Now</button>
  </Link>
</>
))
}
      </div>
    </div>
  );
};