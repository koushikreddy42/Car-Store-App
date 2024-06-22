import React, {useState} from 'react';
import styles from './App.module.css';
// import BookNow from './Book Now Component/BookNow';
// import ElectricList from './Electric List Component/ElectricList';
// import GasList from './Gas List Component/GasList';
// import Header from './Book Now Component/Header';
import Footer from './Book Now Component/Footer';

function App() {

  return (
    
      <div className={styles.app_container}>
        {/* <Header/> */}
       <main className={styles.main_content}>
        {/* <BookNow/>  */}
        
      </main> 
      <Footer/>
      </div>

  );
 
}
export default App;