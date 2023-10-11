import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/order.css';
import { useNavigate } from 'react-router-dom';
import  Navbar from '../components/Navbar';

export const OrderDetails = () => {
  const navigate=useNavigate()
  const [data, setData] = useState([]);
  const [searchedName, setSearchedName] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`http://localhost:9000/api/v1/orders/name`);
        // const response = await axios.get(`http://localhost:9000/api/v1/orders/email`);
        const response = await axios.get('http://localhost:9000/api/v1/orders');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);
 
  console.log(data);
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:9000/api/v1/orders/name?name=${searchedName}`);
      setSearchResult(response.data);

      if (!searchedName) {
        setError('Please enter a user name to search.');
        setSearchResult([]);
        setSuccess('');
      } else if (response.data.length === 0) {
        setError('No orders found for the provided name.');
        setSearchResult([]);
        setSuccess('');
      } else {
        setSuccess('Search successful.');
        setError('');
        // navigate('/order')
      }
    } catch (error) {
      setError('An error occurred during the search.');
      setSearchResult([]);
      setSuccess('');
    }

    console.log(searchResult);
  };

  return (
    <div>
      <Navbar/>
      <h2 style={{ textAlign: "center", color: "blue", marginTop: "20px" }}>Order Details</h2>
      <center>
      <h2 style={{color:"green",marginTop:"-20px"}}>--------------------</h2>
      </center>
      <div>
       <h2 style={{color:"red"}}>UserNames</h2>
       <>================</>
        <h4  style={{color:"blue"}}>
          {data && data.map(name=>{return(<>{name.username}</>)})}</h4>
        <form onSubmit={handleSearch}>
          <input
            style={{ marginTop: '30px' }}
            type="text"
            name="name"
            placeholder="Enter user name"
            value={searchedName}
            onChange={(e) => setSearchedName(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">UserName</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">PhoneNo</th>
              <th scope="col">ProductId</th>
              <th scope="col">ProductName</th>
              <th scope="col">ProductQty</th>
              <th scope="col">TotalPrice</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((order, index) => (
              <tr key={index} className="details">
                <td>{order.username}</td>
                <td>{order.name}</td>
                <td>{order.addres}</td>
                <td>{order.phoneno}</td>
                <td>{order.productid}</td>
                <td>{order.producttitle}</td>
                <td>{order.productqty}</td>
                <td>{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};