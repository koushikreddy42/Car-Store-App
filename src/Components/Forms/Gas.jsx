import styles from './Gas.module.css'
        
        function GasForm() {
            return (
                <div className={styles.page}>
                    <form className={styles.gasform}>
                    
                    <div className={styles.lines}>
                    <h1 className={styles.heading}>Add Gas</h1>
                    </div>
                    
                    <div className={styles.row}>
                        <div className={styles.info}>
                            <label>ImagePath(image/filename.extension)</label>
                            <div>
                                <input className={styles.path} placeholder='images/1.jpg' />
                            </div>
                        </div>
                        <div className={styles.info}>
                            <label className={styles.upload_text}>Upload image</label>
                            <div>
                                <input className={styles.upload} type="file" accept="image/*" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.info}>
                            <label>Title</label>
                            <div>
                                <input className={styles.title}  placeholder='2019 Ford Mustang' />
                            </div>
                        </div>
                        <div className={styles.info}>
                            <label>Year</label>
                              <div>
                              <input className={styles.year}  type='number' max={2024} min={1990} placeholder='2024' />
                              </div>
                                
                            
                        </div>
                        <div className={styles.info}>
                       <label>Price</label>
                         <div>
                            <input className={styles.price}  type='text' placeholder='58,100' />
                        </div>
                     </div>
                    </div>
                    <div className={styles.row}>
                     
                     <div className={styles.info}>
                       <label>Top Speed</label>
                         <div>
                            <input className={styles.speed}  type='text' placeholder='185' />
                        </div>
                     </div>
                     <div className={styles.info}>
                       <label>Cylinders</label>
                         <div>
                            <input className={styles.cylinders}  type='number' max={16} min={0} placeholder='11' />
                        </div>
                     </div>
                     <div className={styles.info}>
                       <label>Time60</label>
                         <div>
                            <input className={styles.time}  type='text' placeholder='3.8' />
                        </div>
                        
                     </div>
                     
                    </div>
                    <div className={styles.row} >
                    <div className={styles.info}>
                       <label>Mileage</label>
                       <div>
                       <input className={styles.mileage} type='text' placeholder='19' />
                       </div>
                       
                       
                    </div>
                    <div className={styles.info}>
                       <label>Color</label>
                       <div>
                       <input className={styles.color}  type='text' placeholder='Black' />
                       </div>
                       
                       
                    </div>
                    <div className={styles.info}>
                            <label>Engine</label>
                            <div>
                            <input className={styles.engine}  type="number" step={0.1}  name="engine" placeholder="5.0" />
                            </div>
                            
                        </div>
                        <div className={styles.info}>
                            <label>Drivetrain</label>
                            <input className={styles.drive}  type="text" placeholder="RWD" />
                        </div>
                        
                    </div>
                    <div className={styles.row}>
                        
                        <div className={styles.info}>
                            <label>Gearbox</label>
                            <input className={styles.gearbox}  type="text" placeholder="6-Speed SelectShift" />
                        </div>
                       
                            <div className={styles.info} >
                        <label>Transmission</label>
                        <input className={styles.transmission}  type="text"  placeholder="Automatic" />
                        </div>

                    </div>

                    <div className={styles.row}>
                    <div className={styles.info}>
                            <label>Performance</label>
                            <div>
                                <input className={styles.performance}  placeholder='Performance description' />
                            </div>
                        </div>
                    <div className={styles.info}>
                        <label>Interior</label>
                        <input className={styles.interior}  type='text' placeholder='Cream Oakwood Interior' />
                    </div>
                    
                    
                    <div className={styles.info}>
                        <label>Wheel</label>
                        <input  className={styles.wheel} type='text' placeholder="18'' Aluminium Wheels" />
                    </div>
                    
                    </div>
                    <div className={styles.info}>
                            <label>Safety</label>
                            <div>
                                <input className={styles.safety}  placeholder='Safety Info' />
                            </div>
                        </div>
                        <div className={styles.info}>
                            <label>Technology</label>
                            <div>
                                <input className={styles.techno}  placeholder='Technology info' />
                            </div>
                        </div>
                    <div className={styles.info}>
                        <label>Description</label>
                        <input className={styles.description}  type='text' placeholder="Description Info" />
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
        
    
