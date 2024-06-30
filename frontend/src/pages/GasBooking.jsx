import React, { useState,useContext,useEffect } from 'react';
import { store } from '../App';
import { Navigate,useParams } from 'react-router-dom';
import axios from 'axios'
import PlaceOrder from './PlaceOrder'
import styles from '../components/Booking/GasBooking.module.css'
import t3p from '../components/Assets/t3p.png'
import t3p2 from '../components/Assets/t3p2.png'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

function Booking(){

  const {param1,param2,param3} = useParams()
    const [token,setToken]=useContext(store)
    const [data,setData]=useState(null)
    const [car, setCar] = useState(null);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = car ? [car.image, t3p2] : [];
    const [isFavorite, setIsFavorite] = useState(param3 === 'true');

    const goToPrevious = () => {
      if (car) {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex - 1 + images.length) % images.length
        );
      }
    };
  
    const goToNext = () => {
      if (car) {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % images.length
        );
      }
    };
    
    useEffect(()=>{
        axios.get('http://localhost:8080/api/myprofile',{
                headers:{
                    'x-token':token
                }
            }).then(res=>setData(res.data)).catch(err=>console.log(err))
    },[])
    
    if(!token){
        return <Navigate to='/sign'/>
    }
    useEffect(() => {
      if (param2 === 'ev' || param2 === 'gas') {
        const endpoint = param2 === 'ev' ? 'electric-listt' : 'gas-listt';
  
        const fetchCar = async () => {
          try {
            const response = await fetch(`http://localhost:8080/api/${endpoint}/${param1}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCar(data);
          } catch (error) {
            setError(error.message);
          }
        };
        const fetchData = async () => {
          await fetchCar();
      };
  
      fetchData();
      }
    }, [param1, param2]);
    console.log(car)

  const [isPlaceOrderOpen, setPlaceOrderOpen] = useState(false);
  const openPlaceOrder = () => setPlaceOrderOpen(true);
  const closePlaceOrder = () => setPlaceOrderOpen(false);

  useEffect(() => {
    if (isPlaceOrderOpen) {
      document.body.style.overflow = 'hidden';
      
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [isPlaceOrderOpen]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.post('http://localhost:8080/api/remove-favourite', { carId: car._id }, {
          headers: {
            'x-token': token
          }
        });
      } else {
        await axios.post('http://localhost:8080/api/add-favourite', { carId: car._id, carType: 'gascarmodel' }, {
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

  if(data) console.log(data._id)

  return(
  <div className={styles.container}>
    {
        car&&data?(
            <>
    <div className={styles.row}>

      {/*------ Column 1 ------*/}

     <div className={styles.col_sm}>
      <div className={styles.carModel}>
        <h2>{car.title}</h2>
        <p className={styles.perf}>Performance Edition</p>
      </div>
      <div className={styles.imageSlider}>
        <button className ={styles.buttonLeft} onClick={goToPrevious}>&lt;</button>
        <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`}/>
        <button className ={styles.buttonRight} onClick={goToNext}>&gt;</button>
      </div>

       {/*------feature boxes------*/}

      <div className={styles.feat}>
        <div className={styles.box1}>
          <a><i class="fa-solid fa-stopwatch"></i></a>
          <div className={styles.midbox}>
            <p className={styles.num}>{car.time60}</p>
            <p className={styles.text}>sec</p>
          </div>
          <p className={styles.text2}>0-60mph</p>
        </div>
        <div className={styles.box2}>
          <a><i class="fa-solid fa-gauge-simple-high"></i></a>
          <div className={styles.midbox}>
            <p className={styles.num}>{car.topspeed}</p>
            <p className={styles.text}>mph</p>
          </div>
          <p className={styles.text2}>Top Speed</p>
        </div>
        <div className={styles.box3}>
          <a><i class="fa-solid fa-gas-pump"></i></a>
          <div className={styles.midbox}>
            <p className={styles.num}>{car.mileage}</p>
            <p className={styles.text}>ml</p>
          </div>
          <p className={styles.text2}>Mileage</p>
        </div>
      </div>

      {/*------Key features------*/}

      <div className={styles.keyfeat}>
  <p className={styles.keyhead}><b>Key Features</b></p>
  <div className={styles.feats}>
    <div className={styles.icontxt}>
      <i className="fa-solid fa-gauge-high"></i>
      <p>{car.engine}</p>
    </div>
    <div className={styles.icontxt}>
      <i className="fa-solid fa-compress"></i>
      <p>{car.cylinders} Cylinder</p>
    </div>
    <div className={styles.icontxt}>
      <i className="fa-solid fa-gear"></i>
      <p>{car.gearbox} Transmission</p>
    </div>
    <div className={styles.icontxt}>
      <i className="fa-solid fa-car-side"></i>
      <p>{car.transmission}</p>
    </div>
    <div className={styles.icontxt}>
      <i className="fa-solid fa-spray-can"></i>
      <p>{car.colour}</p>
    </div>
    <div className={styles.icontxt}>
      <i className="fa-solid fa-couch"></i>
      <p>{car.interior}</p>
    </div>

    <div className={styles.icontxt}>
      <i className="fa-solid fa-road"></i>
      <p>{car.drivetrain}</p>
    </div>
    <div className={styles.icontxt}>
      <i className="fa-solid fa-circle"></i>
      <p>{car.wheel}</p>
    </div>
  </div>
</div>
     </div>

     {/*------Column2------*/}

     <div className={styles.col_sm}>

      {/*------Pricing box------*/}

      <div className={styles.addtext}>
        <div className={styles.pricetag}>
          <p className={styles.price}>$ {car.price}</p>
          <p className={styles.tax}>Excluding taxes and order fee</p>
        </div>
        <hr className={styles.line} />
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
          padding: '0px',
          borderRadius: '50%',
        }}
      >
        {isFavorite === true ? (
  <AiFillHeart color="red" size={30} />
) : (
  <AiOutlineHeart color="#333" size={30} />
)}
      </button>
          <button className={styles.order} onClick={openPlaceOrder}>Place Order</button>  
        </div>
        <button className={styles.tdrive}>Book Test Drive <i class="fa-regular fa-calendar"></i></button> 
      </div>

      {/*------Description------*/}
      
      <div className={styles.additionalDetails}>
          <div className={styles.desc}>
            <h4 className={styles.descHeading}>Warranty</h4>
            <p className={styles.descPara}>50,000 mi / 4 years</p>
          </div><hr className={styles.endline}/>
          <div className={styles.desc}>
            <h4 className={styles.descHeading}>Performance</h4>
            <p className={styles.descPara}><style>
             @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap');
             </style>{car.performance}</p>
          </div><hr className={styles.endline}/>
          <div className={styles.desc}>
            <h4 className={styles.descHeading}>Safety</h4>
            <p className={styles.descPara}>{car.safety}</p>
          </div><hr className={styles.endline}/>
          <div className={styles.desc}>
            <h4 className={styles.descHeading}>Technology</h4>
            <p className={styles.descPara}>{car.technology}</p>
          </div>
      </div>
     </div>
     

    </div>
    <PlaceOrder isOpen={isPlaceOrderOpen} onClose={closePlaceOrder} carType="gas" buyerId={data._id} carId={car._id}/>
     </>) : (
        <p>Loading...</p> // Placeholder for when car data is being fetched
      )
     }
  </div>
  );
}
export default Booking;