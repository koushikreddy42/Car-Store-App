import { useState,useContext,useEffect } from 'react';
import styles from '../components/Forms/EvsForm.module.css';
import axios from 'axios'
import { Navigate} from 'react-router-dom';
import { store } from '../App';

function EvsForm() {
  const [imagePath, setImagePath] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [topspeed, setTopSpeed] = useState('');
  const [time60, setTime60] = useState('');
  const [range, setRange] = useState('');
  const [colour, setColor] = useState('');
  const [interior, setInterior] = useState('');
  const [wheel, setWheel] = useState('');
  const [description, setDescription] = useState('');
  const [rangedescription, setRangeDescription] = useState('');
  const [performance, setPerformance] = useState('');
  const [safety, setSafety] = useState('');
  const [technology, setTechnology] = useState('');
  const [postImage, setPostImage] = useState( { myFile : ""})
  const [token,setToken]=useContext(store)
  const [data,setData]=useState(null)
  const [showProcessingDialog, setShowProcessingDialog] = useState(false);
    
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = {
        title,
        year,
        price,
        topspeed,
        time60,
        range,
        colour,
        interior,
        wheel,
        description,
        rangedescription,
        technology,
        safety,
        performance,
        image: postImage.myFile,
        addedBy:data._id,
        isAdmin:false
      };

      setShowProcessingDialog(true);
  
      const response = await axios.post('http://localhost:8080/api/electric-form', formData);
      console.log(response.data);
      // Handle success or redirect to another page
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile : base64 })
  }



  return (
    <div className={styles.page}>
                    <form className={styles.evsform} onSubmit={handleSubmit}>
                    <div className={styles.box}>
                    <h1 className={styles.heading}>Add Electric</h1>
                    </div>
                    
                    
                    <div className={styles.row}>
                    <div className={styles.info}>
            <label className={styles.upload_text}>Upload image</label>
            <div>
              <input type="file" lable="Image" name="myFile" id='file-upload' accept='.jpg, .jpeg, .png' onChange={(e) => handleFileUpload(e)} required/>
            </div>
          </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.info}>
                            <label>Title</label>
                            <div>
                            <input
                placeholder="Tesla Model Y Long Range AWD"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required/>
                            </div>
                        </div>
                        
                        <div className={styles.info}>
                            <label>Year</label>
                            <div>
                            <input
                type="number"
                max={2024}
                min={1990}
                placeholder="2024"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required/>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <label>Performance</label>
                            <div>
                            <input
            type="text"
            placeholder="Performance Description"
            value={performance}
            onChange={(e) => setPerformance(e.target.value)}
            required/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                     <div className={styles.info}>
                       <label>Price</label>
                         <div>
                         <input
                type="text"
                placeholder="54,000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required/>
                        </div>
                     </div>
                     <div className={styles.info}>
                       <label>Top Speed</label>
                         <div>
                         <input
                type="text"
                placeholder="135"
                value={topspeed}
                onChange={(e) => setTopSpeed(e.target.value)}
                required/>
                        </div>
                     </div>
                     <div className={styles.info}>
                       <label>Time60</label>
                         <div>
                         <input
                type="text"
                placeholder="4.8"
                value={time60}
                onChange={(e) => setTime60(e.target.value)}
                required/>
                        </div>
                     </div>

                    </div>
                    <div className={styles.row} >
                    <div className={styles.info}>
                       <label>Range</label>
                       
                       <input
              type="text"
              placeholder="346"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              required/>
                       
                    </div>
                    
                    <div className={styles.info}>
                       <label>Color</label>
                       
                       <input
              type="text"
              placeholder="Black"
              value={colour}
              onChange={(e) => setColor(e.target.value)}
              required/>
                       
                    </div>
                    </div>

                    <div className={styles.row}>
                    <div className={styles.info}>
                        <label>Interior</label>
                        <input
              type="text"
              placeholder="Cream Oakwood Interior"
              value={interior}
              onChange={(e) => setInterior(e.target.value)}
              required/>
                    </div>
                    
                    
                    <div className={styles.info}>
                        <label>Wheel</label>
                        <input
              type="text"
              placeholder="19'' Induction Wheels"
              value={wheel}
              onChange={(e) => setWheel(e.target.value)}
              required/>
                    </div>
                    <div className={styles.info}>
                            <label>Technology</label>
                            <div>
                            <input
            type="text"
            placeholder="Technology Info"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
          />
                            </div>
                        </div>
                    </div>
                    <div className={styles.info}>
                            <label>Safety</label>
                            <div>
                            <input
            type="text"
            placeholder="Safety Description"
            value={safety}
            onChange={(e) => setSafety(e.target.value)}
            required/>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <label>RangeDesc</label>
                            <div>
                            <input
            type="text"
            placeholder="Range Description Info"
            value={rangedescription}
            onChange={(e) => setRangeDescription(e.target.value)}
            required/>
                            </div>
                        </div>
                        
                    <div className={styles.info}>
                        <label>Description</label>
                        <input
            type="text"
            placeholder="Description Info"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
                    </div>
                    <div class="btns">
            <button type="submit" className={styles.save}> Save </button>
            <button className={styles.back}>Back</button>
        </div>
      </form>
      {/* Processing dialog */}
      {showProcessingDialog && (
        <div className={styles.processingDialog}>
          <div className={styles.proIcon}><i class="fa-regular fa-hourglass-half"></i></div>
          <div className={styles.info}>
            <div className={styles.req}><p><b>Your request to sell is in process...</b></p></div>
            <div className={styles.dash}><p>You can check it's status in the dashboard.</p></div>
          </div>
        </div>
      )} 
    </div>
  );
}

export default EvsForm;

function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }