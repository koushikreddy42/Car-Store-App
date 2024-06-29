import React, { useState } from 'react';
import styles from './Buyer.module.css';
import logo from '../Assets/logo.png';
import { FaCheck, FaTimes } from 'react-icons/fa';

const BuyerDetails = () => {
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

    const handleAccept = (id,FirstName) => {
        const confirm = window.confirm(`Accept request from ${FirstName}?`);
        if(confirm){
        setData(data.map(buyer => buyer.id === id ? { ...buyer, status: 'Accepted' } : buyer));
        }
    };

    const handleReject = (id,FirstName) => {
        const confirm = window.confirm(`Reject request from ${FirstName}?`);
        if(confirm){
        setData(data.map(buyer => buyer.id === id ? { ...buyer, status: 'Rejected' } : buyer));
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
                <h2>Buyers</h2>
                <p>Here you can find the Buyers details...</p>
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
                                                    <button className={styles.Accept} onClick={() => handleAccept(buyer.id,buyer.FirstName)}>Accept</button>
                                                    <button className={styles.Reject} onClick={() => handleReject(buyer.id,buyer.FirstName)}>Reject</button>
                                                </>
                                            ) : (
                                                <div className={buyer.status === 'Accepted' ? styles.statusAccepted : styles.statusRejected}>
                                                    {buyer.status === 'Accepted' ? (
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

export default BuyerDetails;
