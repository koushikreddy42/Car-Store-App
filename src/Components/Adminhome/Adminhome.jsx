import styles from './Adminhome.module.css'
import logo from '../Assets/logo.png'
import fire from '../Assets/fire.png'
import electric from '../Assets/evs.png'

function Adminhome(){
    return(
        <div className={styles.main_body}>
            <img className={styles.logo}  src={logo}/>
             <div className={styles.buttons_box}>
                <div className={styles.options}>
                    
                    <button className={styles.evs}>  <img className={styles.icon} src={electric} /> EVs</button></div>
                <div className={styles.options}>
                
                    <button className={styles.gas}><img  className={styles.icon}   src={fire} /> Gas</button></div>
                <div className={styles.options}><button className={styles.customers}>Customers</button></div>
             </div>
        </div>
    );
}
export default Adminhome;