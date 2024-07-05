import React, { useState,useContext,useEffect } from 'react';
import { store } from '../App';
import { Navigate,Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../components/Dashboard/Adminboard.module.css'
import logo from '../components/Assets/logo.png'
import { FaCheck, FaTimes } from 'react-icons/fa';

const Buyers = () => {
    const [adminToken,setAdminToken]=useContext(store)
    const [admindata,setAdminData]=useState(null)
    const [buyingFormData, setBuyingFormData] = useState([]);
    if(!adminToken){
        return <Navigate to='/admin-sign'/>
    }
    useEffect(()=>{
        axios.get('http://localhost:8080/api/admin-myprofile',{
                headers:{
                    'x-token':adminToken
                }
            }).then(res=>setAdminData(res.data)).catch(err=>console.log(err))
    },[])
    const [data, setData] = useState([
        {
            id: 1,
            carmodel: 'Tesla Model 3 Performance',
            carprice: '54,000',
            FirstName: 'Veda',
            LastName: 'Parimi',
            Email: 'veda@gmail.com',
            phone: '91-9876543234',
            status: null,
            address: {
                houseNumber: '123',
                streetAddress: 'Elm Street',
                city: 'Springfield',
                region: 'ert',
                state: 'IL',
                zipCode: '62701'
            },
            documents: ['https://example.com/doc1.pdf', 'https://example.com/doc2.pdf'],
            comments: 'car looks classy in the pictures though.'

        },
        {
            id: 2,
            carmodel: 'Tesla Model 3 Standard Plus',
            carprice: '41,000',
            FirstName: 'Priya',
            LastName: 'Chamanthula',
            Email: 'priya@gmail.com',
            phone: '91-9876543233',
            status: null,
            address: {
                houseNumber: '456',
                streetAddress: 'Maple Avenue',
                city: 'Springfield',
                region: 'jghj',
                state: 'IL',
                zipCode: '62702'
            },
            documents: ['https://example.com/doc3.pdf', 'https://example.com/doc4.pdf'],
            comments:'I have been looking for this model, finally found at affordable cost.'
        },
        {
            id: 3,
            carmodel: 'Tesla Model S Performance',
            carprice: '102,000',
            FirstName: 'Koushik',
            LastName: 'Kandula',
            Email: 'kkk@gmail.com',
            phone: '91-9876543235',
            status: null,
            address: {
                houseNumber: '789',
                streetAddress: 'Oak Street',
                city: 'Springfield',
                region:'bnhj',
                state: 'IL',
                zipCode: '62703'
            },
            documents: ['https://example.com/doc5.pdf', 'https://example.com/doc6.pdf'],
            comments:"-" 
        }
    ]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/get-filess')
            .then(res => {
                if (res.data.status === 'ok') {
                    setBuyingFormData(res.data.data);
                    // console.log(res.data.data); // This logs the updated buyingFormData
                } else {
                    console.error('Error fetching buying form data:', res.data.status);
                }
            })
            .catch(err => console.error('Error fetching buying form data:', err));
    }, []);
    
    // Logging useEffect to see the updated buyingFormData
    useEffect(() => {
        console.log(buyingFormData); // This will log the updated state of buyingFormData
    }, [buyingFormData]);

    const [view, setView] = useState('For sale');

    
    const handleVerify = (buyerId, carType, carId,formId, isAdmin) => {
        const confirm = window.confirm('Are you sure? Request will be sent to the car owner.');
        if (confirm) {
            axios.post('http://localhost:8080/api/admin-accept', { buyerId, carType, carId, formId, isAdmin })
              .then(response => {
                // Assuming the backend responds with a message or updated data
                console.log(response.data); // Log or handle response as needed
        
                // Update frontend data if needed
                setBuyingFormData(buyingFormData.map(buyer => buyer._id === formId ? { ...buyer, adminVerified: 'accepted' } : buyer));
              })
              .catch(error => {
                console.error('Error cancelling request:', error);
                // Handle error response if necessary
              });
          }
    };
    

    const handleCancel = (buyerId, carType, carId,formId) => {
        const confirm = window.confirm('Are you sure? You want to cancel the request?');
        
        if (confirm) {
          axios.post('http://localhost:8080/api/admin-cancel', { buyerId, carType, carId, formId })
            .then(response => {
              // Assuming the backend responds with a message or updated data
              console.log(response.data); // Log or handle response as needed
      
              // Update frontend data if needed
              setBuyingFormData(buyingFormData.map(buyer => buyer._id === formId ? { ...buyer, adminVerified: 'declined' } : buyer));
            })
            .catch(error => {
              console.error('Error cancelling request:', error);
              // Handle error response if necessary
            });
        }
      };

    const handleViewDocument = (filename) => {
        const baseUrl = 'http://localhost:8080';
        const url = `${baseUrl}/files/${encodeURIComponent(filename)}`;
        console.log(url); // Log the constructed URL for debugging
        window.open(url, '_blank');
    };
    const pendingRequests = buyingFormData.filter(buyer => buyer.adminVerified === 'pending').length;
    


    return (
        <div className={styles.BuyerDetails}>
            <div className={styles.header}>
                <img className={styles.logo} src={logo} alt="Logo" />
                <div>Pending Requests: {pendingRequests}</div>
                <button className={styles.welcome}>Welcome Admin</button>
            </div>
            <div className={styles.startline}>
                <h2>Buyers Details</h2>
                <select className={styles.viewSelector} value={view} onChange={(e) => setView(e.target.value)}>
                    <option value="For sale">For sale</option>
                    <option value="Sold">Sold</option>
                </select>
            </div>
            {view === 'For sale'  ? (
                buyingFormData.length > 0 ? (
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th>Uploaded Documents</th>
                                    <th>Comments</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {buyingFormData.map(buyer => (
                                    <tr key={buyer.id}>
                                        <td>{buyer.carDetails.title}</td>
                                        <td>{buyer.carDetails.price}</td>
                                        <td>{buyer.firstName}</td>
                                        <td>{buyer.lastName}</td>
                                        <td>{buyer.email}</td>
                                        <td>{buyer.phone}</td>
                                        <td>
                                            {buyer.houseNo}, {buyer.streetAddress},{buyer.city}<br />
                                            {buyer.region}, {buyer.state}, {buyer.postalCode}
                                        </td>
                                        <td>
                                        <button className={styles.docs} onClick={() => handleViewDocument(buyer.pdf)}>
                                            View Document
                                        </button>
                                    </td>
                                        <td>{buyer.comments}</td>
                                        <td>
                                            {buyer.adminVerified === 'pending' ? (
                                                <>
                                                    <button className={styles.Verify} onClick={() => handleVerify(buyer.buyerId,buyer.carType,buyer.carDetails._id,buyer._id,buyer.isAdmin)}>Verify</button>
                                                    <button className={styles.Cancel} onClick={() => handleCancel(buyer.buyerId,buyer.carType,buyer.carDetails._id,buyer._id,buyer.isAdmin)}>Cancel</button>
                                                </>
                                            ) : (
                                                <div className={buyer.adminVerified === 'accepted' ? styles.statusVerified : styles.statusCancelled}>
                                                    {buyer.adminVerified === 'accepted' ? (
                                                        <FaCheck className={styles.statusIcon} />
                                                    ) : (
                                                        <FaTimes className={styles.statusIcon} />
                                                    )}
                                                       
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No buyers yet!</p>
                )
            ) : (
                buyingFormData.length > 0 ? (
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th>Uploaded Documents</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {buyingFormData.map(buyer => (
                                    buyer.ownerVerified==='accepted'&&
                                    <tr key={buyer.id}>
                                        <td>{buyer.carDetails.title}</td>
                                        <td>{buyer.carDetails.price}</td>
                                        <td>{buyer.firstName}</td>
                                        <td>{buyer.lastName}</td>
                                        <td>{buyer.email}</td>
                                        <td>{buyer.phone}</td>
                                        <td>
                                            {buyer.houseNo}, {buyer.streetAddress},{buyer.city}<br />
                                            {buyer.region}, {buyer.state}, {buyer.postalCode}
                                        </td>
                                        <td>
                                        <button className={styles.docs} onClick={() => handleViewDocument(buyer.pdf)}>
                                            View Document
                                        </button>
                                    </td>
                                        <td>{buyer.comments}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No buyers yet!</p>
                ))}
        </div>
    );
}

export default Buyers;