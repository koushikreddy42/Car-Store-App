import React from 'react'
import styles from './SortAndCars.module.css'
import {CarCardGas} from './CarCardGas'
import carDataGas from '../../../db_data/gasmodel.json'
import  { useState } from 'react';
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
  const [rangeValue, setRangeValue] = useState(60);

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

  let gas_html=carDataGas
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
        case '2017':
          return item.year === 2017;
        case '2018':
          return item.year === 2018;
        case '2019':
          return item.year === 2019;
        case '2020':
            return item.year === 2020;
        default:
          return true;
      }
    };

    const isValidRange = () => {
      return item.mileage <= rangeValue;
    };

    return isValidPrice() && isValidYear() && isValidRange();
  })
  .map((item) => (
    <CarCardGas
      title={item.title}
      topspeed={item.topspeed}
      time60={item.time60}
      mileage={item.mileage}
      colour={item.colour}
      interior={item.interior}
      wheel={item.wheel}
      description={item.description}
      price={item.price}
      imagePath={item.imagePath}
      year={item.year}
      gearbox={item.gearbox}
      transmission={item.transmission}
      engine={item.engine}
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
              value="2017"
              checked={selectedOption1 === '2017'}
              onChange={handleOptionChange1}
            />
            2017
          </label>
          <label>
            <input
              type="radio"
              value="2018"
              checked={selectedOption1 === '2018'}
              onChange={handleOptionChange1}
            />
            2018
          </label>
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
        </div>
      )}
    </div>
    <div className="range-div">
      <button className= {styles.sort_button} onClick={handleButtonClick2}>
        Mileage
      </button>
      {showOptions2 && (
        <div className={styles.options_box2}>
          <label>
            Range: {rangeValue} km
            <input
              type="range"
              min="10"
              max="50"
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
            {gas_html}
        </div>
        
    </div>
  )
}
