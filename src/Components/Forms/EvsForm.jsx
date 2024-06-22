import styles from './EvsForm.module.css'
        
        function EvsForm() {
            return (
                <div className={styles.page}>
                    <form className={styles.evsform}>
                    <div className={styles.box}>
                    <h1 className={styles.heading}>Add Electric</h1>
                    </div>
                    
                    
                    <div className={styles.row}>
                        <div className={styles.info}>
                            <label>ImagePath(image/filename.extension)</label>
                            <div>
                                <input  className={styles.path} placeholder='images/1.jpg' />
                            </div>
                        </div>
                        <div className={styles.info}>
                            <label className={styles.upload_text}>Upload image</label>
                            <div>
                                <input className={styles.upload}  type="file" accept="image/*" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.info}>
                            <label>Title</label>
                            <div>
                                <input  className={styles.title} placeholder='Tesla Model Y Long Range AWD' />
                            </div>
                        </div>
                        <div className={styles.info}>
                            <label>Year</label>
                            <div>
                                <input className={styles.year} type='number' max={2024} min={1990} placeholder='2024' />
                            </div>
                        </div>
                        <div className={styles.info}>
                            <label>Performance</label>
                            <div>
                                <input className={styles.performance} placeholder='Performance Description' />
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                     <div className={styles.info}>
                       <label>Price</label>
                         <div>
                            <input className={styles.price} type='text' placeholder='54,000' />
                        </div>
                     </div>
                     <div className={styles.info}>
                       <label>Top Speed</label>
                         <div>
                            <input className={styles.speed}  type='text' placeholder='135' />
                        </div>
                     </div>
                     <div className={styles.info}>
                       <label>Time60</label>
                         <div>
                            <input className={styles.time} type='text' placeholder='4.8' />
                        </div>
                     </div>

                    </div>
                    <div className={styles.row} >
                    <div className={styles.info}>
                       <label>Range</label>
                       
                       <input className={styles.range} type='text' placeholder='346' />
                       
                    </div>
                    
                    <div className={styles.info}>
                       <label>Color</label>
                       
                       <input className={styles.color} type='text' placeholder='Black' />
                       
                    </div>
                    </div>

                    <div className={styles.row}>
                    <div className={styles.info}>
                        <label>Interior</label>
                        <input className={styles.interior} type='text' placeholder='Cream Oakwood Interior' />
                    </div>
                    
                    
                    <div className={styles.info}>
                        <label>Wheel</label>
                        <input className={styles.wheel} type='text' placeholder="19'' Induction Wheels" />
                    </div>
                    <div className={styles.info}>
                            <label>Technology</label>
                            <div>
                                <input className={styles.techno}  placeholder='Technology Info' />
                            </div>
                        </div>
                    </div>
                    <div className={styles.info}>
                            <label>Safety</label>
                            <div>
                                <input className={styles.safety}  placeholder='Safety Description' />
                            </div>
                        </div>
                    <div className={styles.info}>
                        <label>Description</label>
                        <input className={styles.description} type='text' placeholder="Description Info" />
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
        
    
