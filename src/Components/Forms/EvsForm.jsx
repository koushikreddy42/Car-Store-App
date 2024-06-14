import { useState } from 'react';
import styles from './EvsForm.module.css'
        
        function EvsForm() {
            return (
                <div className={styles.page}>
                    <form className={styles.evsform}>
                    <div className={styles.underline1}></div> 
                    <h1 className={styles.heading}>Add Electric</h1>
                    <div className={styles.underline}></div>
                    <div className={styles.row}>
                        <div className={styles.path}>
                            <label>ImagePath(image/filename.extension)</label>
                            <div>
                                <input placeholder='images/1.jpg' />
                            </div>
                        </div>
                        <div className={styles.upload}>
                            <label className={styles.upload_text}>Upload image</label>
                            <div>
                                <input type="file" accept="image/*" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.title}>
                            <label>Title</label>
                            <div>
                                <input placeholder='Tesla Model Y Long Range AWD' />
                            </div>
                        </div>
                        <div className={styles.year}>
                            <label>Year</label>
                            <div>
                                <input type='number' max={2024} min={1990} placeholder='2024' />
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                     <div className={styles.price}>
                       <label>Price</label>
                         <div>
                            <input type='text' placeholder='54,000' />
                        </div>
                     </div>
                     <div className={styles.speed}>
                       <label>Top Speed</label>
                         <div>
                            <input type='text' placeholder='135' />
                        </div>
                     </div>
                     <div className={styles.time}>
                       <label>Time60</label>
                         <div>
                            <input type='text' placeholder='4.8' />
                        </div>
                     </div>

                    </div>
                    <div className={styles.row} >
                    <div className={styles.range}>
                       <label>Range</label>
                       
                       <input  type='text' placeholder='346' />
                       
                    </div>
                    <div className={styles.color}>
                       <label>Color</label>
                       
                       <input type='text' placeholder='Black' />
                       
                    </div>
                    </div>

                    <div className={styles.row}>
                    <div className={styles.interior}>
                        <label>Interior</label>
                        <input type='text' placeholder='Cream Oakwood Interior' />
                    </div>
                    
                    
                    <div className={styles.wheel}>
                        <label>Wheel</label>
                        <input type='text' placeholder="19'' Induction Wheels" />
                    </div>
                    </div>

                    <div className={styles.description}>
                        <label>Description</label>
                        <input type='text' placeholder="Description Info" />
                    </div>
                    <div class="btns">
            <button type="submit" className={styles.save}> Save </button>
            <button className={styles.back}>Back</button>
        </div>
                    </form> 
                </div>
            );
        }
        
        export default EvsForm;
        
    
