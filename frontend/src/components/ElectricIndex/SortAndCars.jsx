import React, { useState, useEffect, useContext } from 'react'
import styles from './SortAndCars.module.css'
import { CarCardEv } from './CarCardEv'
import axios from 'axios';
import { store } from '../../App'

export default function SortAndCars() {
    //price 
const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setShowOptions(false);
    
  };
  //year
  const [showOptions1, setShowOptions1] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState('');

  const handleButtonClick1 = () => {
    setShowOptions1(!showOptions1);
  };

  const handleOptionChange1 = (event) => {
    setSelectedOption1(event.target.value);
    setShowOptions1(false);
  };

  //range
  const [showOptions2, setShowOptions2] = useState(false);
  const [rangeValue, setRangeValue] = useState(1000);

  const handleButtonClick2 = () => {
    setShowOptions2(!showOptions2);
  };

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  //sortby
  const [showOptions3, setShowOptions3] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState('');

  const handleButtonClick3 = () => {
    setShowOptions3(!showOptions3);
  };

  const handleOptionClick3 = (option) => {
    setSelectedOption3(option);
    setShowOptions3(false);
  };

  const [token] = useContext(store);
const [electricModels, setElectricModels] = useState([]);
const [favorites, setFavorites] = useState([]);

useEffect(() => {
  const fetchElectricModels = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/electric-listt");
      const data = await response.json();
      setElectricModels(data);
    } catch (error) {
      console.error('Error fetching electric models:', error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/favourites', {
        headers: {
          'x-token': token
        }
      });
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const fetchData = async () => {
    await fetchFavorites();
    await fetchElectricModels();
  };

  fetchData();
}, [token]);

  let ev_html=electricModels
  .filter((item) => {
    const isValidPrice = () => {
      switch (selectedOption) {
        case 'under50':
          return item.price < 50000;
        case 'under75':
          return item.price < 75000;
        case 'under100':
          return item.price < 100000;
        case 'under150':
          return item.price < 150000;
        default:
          return true;
      }
    };

    const isValidYear = () => {
      switch (selectedOption1) {
        case '2019':
          return item.year === 2019;
        case '2020':
          return item.year === 2020;
        case '2021':
          return item.year === 2021;
        default:
          return true;
      }
    };

    const isValidRange = () => {
      return item.range <= rangeValue;
    };

    return isValidPrice() && isValidYear() && isValidRange();
  })
  .map((item) => (
    <CarCardEv
      title={item.title}
      topspeed={item.topspeed} 
      time60={item.time60}
      range={item.range}
      colour={item.colour}
      interior={item.interior}
      wheel={item.wheel}
      description={item.description}
      price={item.price}
      image={item.image}
      year={item.year}
      name={item.addedBy.username}
      _id={item._id}
      isFavorite={favorites.some(fav => fav.car._id === item._id)}
      isSold={item.isSold}
      ownerId={item.addedBy._id}
    />
  ))

  
  
  return (
    <div className="sort">
 
        <div className={styles.sort_bar}>
        <div className={styles.price_div}>
      <button className={styles.sort_button} onClick={handleButtonClick}>
        Price
      </button>
      {showOptions && (
        <div className={styles.options_box}>
          <label>
            <input
              type="radio"
              value="under50"
              checked={selectedOption === 'under50'}
              onChange={handleOptionChange}
            />
            Under $50k
          </label>
          <label>
            <input
              type="radio"
              value="under75"
              checked={selectedOption === 'under75'}
              onChange={handleOptionChange}
            />
            Under $75k
          </label>
          <label>
            <input
              type="radio"
              value="under100"
              checked={selectedOption === 'under100'}
              onChange={handleOptionChange}
            />
            Under $100k
          </label>
          <label>
            <input
              type="radio"
              value="under150"
              checked={selectedOption === 'under150'}
              onChange={handleOptionChange}
            />
            Under $150k
          </label>
        </div>
      )}
    </div>
    <div className="year-div">
      <button className={styles.sort_button} onClick={handleButtonClick1}>
        Year
      </button>
      {showOptions1 && (
        <div className={styles.options_box1}>
          <label>
            <input
              type="radio"
              value="2019"
              checked={selectedOption1 === '2019'}
              onChange={handleOptionChange1}
            />
            2019
          </label>
          <label>
            <input
              type="radio"
              value="2020"
              checked={selectedOption1 === '2020'}
              onChange={handleOptionChange1}
            />
            2020
          </label>
          <label>
            <input
              type="radio"
              value="2021"
              checked={selectedOption1 === '2021'}
              onChange={handleOptionChange1}
            />
            2021
          </label>
        </div>
      )}
    </div>
    <div className="range-div">
      <button className= {styles.sort_button} onClick={handleButtonClick2}>
        Range
      </button>
      {showOptions2 && (
        <div className={styles.options_box2}>
          <label>
            Range: {rangeValue} km
            <input
              type="range"
              min="200"
              max="500"
              step="10"
              value={rangeValue}
              onChange={handleRangeChange}
            />
          </label>
        </div>
      )}
    </div>
    <div className="sortby-div">
      <button className={styles.sort_button} onClick={handleButtonClick3}>
        Sort By
      </button>
      {showOptions3 && (
        <div className={styles.options_box3}>
          <div
            className={`${styles.option} ${selectedOption3 === 'priceHighToLow' ? styles.selected : ''}`}
            onClick={() => handleOptionClick3('priceHighToLow')}
          >
            Price High to Low
          </div>
          <div
            className={`${styles.option} ${selectedOption3 === 'priceHighToLow' ? styles.selected : ''}`}
            onClick={() => handleOptionClick3('priceLowToHigh')}
          >
            Price Low to High
          </div>
          <div
            className={`${styles.option} ${selectedOption3 === 'priceHighToLow' ? styles.selected : ''}`}
            onClick={() => handleOptionClick3('latestyear')}
          >
            Latest Year
          </div>
        </div>
      )}
    </div>

        </div>
        <div className={styles.car_cards}>
            {ev_html}
        </div>
    </div>
  )
}
