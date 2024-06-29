import React, { useState } from 'react';
import styles from '../components/Dashboard/Adminboard.module.css'
import logo from '../components/Assets/logo.png'
import { FaCheck, FaTimes } from 'react-icons/fa';

const Buyers = () => {
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

    const [view, setView] = useState('For sale');

    
    const handleVerify = (id) => {
        const confirm = window.confirm('Are you sure? Request will be sent to the car owner.');
        if (confirm) {
            setData(data.map(buyer => buyer.id === id ? { ...buyer, status: 'Verified' } : buyer));
        }
    };
    

    const handleCancel = (id) => {
        const confirm = window.confirm('Are you sure? You want to cancel the request?');
        if(confirm){
        setData(data.map(buyer => buyer.id === id ? { ...buyer, status: 'Cancelled' } : buyer));
        }
    };

    const handleViewDocument = (url) => {
        window.open(url, '_blank');
    };
    const pendingRequests = data.filter(buyer => buyer.status === null).length;


    return (
        <div className={styles.BuyerDetails}>
            <div className={styles.header}>
                <img className={styles.logo} src={logo} alt="Logo" />
                <div>Pending Requests: {pendingRequests}</div>
                <button className={styles.welcome}>Welcome User</button>
            </div>
            <div className={styles.startline}>
                <h2>Buyers Details</h2>
                <select className={styles.viewSelector} value={view} onChange={(e) => setView(e.target.value)}>
                    <option value="For sale">For sale</option>
                    <option value="Sold">Sold</option>
                </select>
            </div>
            {view === 'For sale' ? (
                data.length > 0 ? (
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
                                {data.map(buyer => (
                                    <tr key={buyer.id}>
                                        <td>{buyer.carmodel}</td>
                                        <td>{buyer.carprice}</td>
                                        <td>{buyer.FirstName}</td>
                                        <td>{buyer.LastName}</td>
                                        <td>{buyer.Email}</td>
                                        <td>{buyer.phone}</td>
                                        <td>
                                            {buyer.address.houseNumber}, {buyer.address.streetAddress},{buyer.address.city}<br />
                                            {buyer.address.region}, {buyer.address.state}, {buyer.address.zipCode}
                                        </td>
                                        <td>
                                            {buyer.documents.map((doc, index) => (
                                                <button className={styles.docs} key={index} onClick={() => handleViewDocument(doc)}>
                                                    View Document {index + 1}
                                                </button>
                                            ))}
                                        </td>
                                        <td>{buyer.comments}</td>
                                        <td>
                                            {buyer.status === null ? (
                                                <>
                                                    <button className={styles.Verify} onClick={() => handleVerify(buyer.id)}>Verify</button>
                                                    <button className={styles.Cancel} onClick={() => handleCancel(buyer.id)}>Cancel</button>
                                                </>
                                            ) : (
                                                <div className={buyer.status === 'Verified' ? styles.statusVerified : styles.statusCancelled}>
                                                    {buyer.status === 'Verified' ? (
                                                        <FaCheck className={styles.statusIcon} />
                                                    ) : (
                                                        <FaTimes className={styles.statusIcon} />
                                                    )}
                                                      {buyer.status}
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
                data.length > 0 ? (
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
                                {data.map(buyer => (
                                    <tr key={buyer.id}>
                                        <td>{buyer.carmodel}</td>
                                        <td>{buyer.carprice}</td>
                                        <td>{buyer.FirstName}</td>
                                        <td>{buyer.LastName}</td>
                                        <td>{buyer.Email}</td>
                                        <td>{buyer.phone}</td>
                                        <td>
                                            {buyer.address.houseNumber}, {buyer.address.streetAddress},{buyer.address.city}<br />
                                            {buyer.address.region}, {buyer.address.state}, {buyer.address.zipCode}
                                        </td>
                                        <td>
                                            {buyer.documents.map((doc, index) => (
                                                <button className={styles.docs} key={index} onClick={() => handleViewDocument(doc)}>
                                                    View Document {index + 1}
                                                </button>
                                            ))}
                                        </td>
                                        <td>{buyer.comments}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No buyers yet!</p>
                )
            )}
        </div>
    );
}

export default Buyers;