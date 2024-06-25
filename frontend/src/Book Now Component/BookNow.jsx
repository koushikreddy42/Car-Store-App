
import React, { useState } from 'react';
import PlaceOrder from './PlaceOrder';
import styles from './BookNow.module.css';
import t3p from '../assets/images/t3p.png';
import t3p2 from '../assets/images/t3p2.png';
import { useEffect } from 'react';

function BookNow(){

  const images = [t3p, t3p2]; // Add more image URLs as needed
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

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

  return(
  <div className={styles.container}>
    <div className={styles.row}>

      {/*------ Column 1 ------*/}

     <div className={styles.col_sm}>
      <div className={styles.carModel}>
        <h2> 2020 Tesla Model 3</h2>
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
            <p className={styles.num}>3.2</p>
            <p className={styles.text}>sec</p>
          </div>
          <p className={styles.text2}>0-60mph</p>
        </div>
        <div className={styles.box2}>
          <a><i class="fa-solid fa-gauge-simple-high"></i></a>
          <div className={styles.midbox}>
            <p className={styles.num}>162</p>
            <p className={styles.text}>mph</p>
          </div>
          <p className={styles.text2}>Top Speed</p>
        </div>
        <div className={styles.box3}>
          <a><i class="fa-solid fa-gas-pump"></i></a>
          <div className={styles.midbox}>
            <p className={styles.num}>300</p>
            <p className={styles.text}>ml</p>
          </div>
          <p className={styles.text2}>Range</p>
        </div>
      </div>

      {/*------Key features------*/}

      <div className={styles.keyfeat}>
        <p className={styles.keyhead}><b>Key Features</b></p> 
        <div className={styles.feats}>
          <div className={styles.icontxt}>
            <a><i class="fa-solid fa-spray-can"></i></a>
            <p>Solid Black Paint</p>
          </div>
          <div className={styles.icontxt}>
            <a><i class="fa-solid fa-couch"></i></a>
            <p>Black Premium Interior</p>
          </div>
          <div className={styles.icontxt}>
            <a><i class="fa-solid fa-circle-radiation"></i></a>
            <p>Autopilot</p>
          </div>
          <div className={styles.icontxt}>
            <a><i class="fa-solid fa-wifi"></i></a>
            <p>Premium Connectivity</p>
          </div>
          <div className={styles.icontxt}>
            <a><i class="fa-solid fa-gear"></i></a>
            <p>20" Aero Wheels</p>
          </div>
        </div>
      </div>
     </div>

     {/*------Column2------*/}

     <div className={styles.col_sm}>

      {/*------Pricing box------*/}

      <div className={styles.addtext}>
        <div className={styles.pricetag}>
          <p className={styles.price}>$ 54,000</p>
          <p className={styles.tax}>Excluding taxes and order fee</p>
        </div>
        <hr className={styles.line} />
        <div className={styles.card}>
          <a href="#addtowishlist"><i className="fa-regular fa-heart fa-lg"></i></a>
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
             </style>Model 3 comes with the option of dual motor all-wheel drive, Performance Wheels and Brakes for total control, in all weather conditions and a spoiler improves stability at high speeds allowing Model 3 to accelerate from 0-60 mph in as little as 3.2 seconds.</p>
          </div><hr className={styles.endline}/>
          <div className={styles.desc}>
            <h4 className={styles.descHeading}>Safety</h4>
            <p className={styles.descPara}>Safety is the most important part of the overall Model 3 design. The metal structure is a combination of aluminum and steel, for maximum strength in every area. In a roof-crush test, Model 3 resisted four times its own mass, even with an all-glass roof.</p>
          </div><hr className={styles.endline}/>
          <div className={styles.desc}>
            <h4 className={styles.descHeading}>Range</h4>
            <p className={styles.descPara}>Model 3 is fully electric, so you never need to visit a gas station again. If you charge overnight at home, you can wake up to a full battery every morning. And when you’re on the road, it’s easy to plug in along the way—at any public station or with the Tesla charging network.</p>
          </div>
      </div>
     </div>
     

    </div>
     <PlaceOrder isOpen={isPlaceOrderOpen} onClose={closePlaceOrder}/> 
  </div>
  );
}
export default BookNow;