import styles from './Gas.module.css'
        
        function GasForm() {
            return (
                <div className={styles.page}>
                    <form className={styles.gasform}>
                    
                    <div className={styles.lines}>
                    <h1 className={styles.heading}>Add Gas</h1>
                    </div>
                    
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
                                <input placeholder='2019 Ford Mustang' />
                            </div>
                        </div>
                        <div className={styles.year}>
                            <label>Year</label>
                              <div>
                              <input type='number' max={2024} min={1990} placeholder='2024' />
                              </div>
                                
                            
                        </div>
                        <div className={styles.price}>
                       <label>Price</label>
                         <div>
                            <input type='text' placeholder='58,100' />
                        </div>
                     </div>
                    </div>
                    <div className={styles.row}>
                     
                     <div className={styles.speed}>
                       <label>Top Speed</label>
                         <div>
                            <input type='text' placeholder='185' />
                        </div>
                     </div>
                     <div className={styles.time}>
                       <label>Time60</label>
                         <div>
                            <input type='text' placeholder='3.8' />
                        </div>
                     </div>
                     
                    </div>
                    <div className={styles.row} >
                    <div className={styles.mileage}>
                       <label>Mileage</label>
                       <div>
                       <input  type='text' placeholder='19' />
                       </div>
                       
                       
                    </div>
                    <div className={styles.color}>
                       <label>Color</label>
                       <div>
                       <input type='text' placeholder='Black' />
                       </div>
                       
                       
                    </div>
                    <div className={styles.engine}>
                            <label>Engine</label>
                            <div>
                            <input type="number" step={0.1}  name="engine" placeholder="5.0" />
                            </div>
                            
                        </div>
                    </div>
                    <div className={styles.row}>
                        
                        <div className={styles.gearbox}>
                            <label>Gearbox</label>
                            <input type="text" placeholder="6-Speed SelectShift" />
                        </div>
                            <div className={styles.transmission} >
                        <label>Transmission</label>
                        <input type="text"  placeholder="Automatic" />
                        </div>
                    </div>

                    <div className={styles.row}>
                    <div className={styles.interior}>
                        <label>Interior</label>
                        <input type='text' placeholder='Cream Oakwood Interior' />
                    </div>
                    
                    
                    <div className={styles.wheel}>
                        <label>Wheel</label>
                        <input type='text' placeholder="18'' Aluminium Wheels" />
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
        
        export default GasForm;
        
    
