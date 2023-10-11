import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "../css/order.css"
import Navbar  from '../components/Navbar';
import { useSelector } from 'react-redux';
const Order = () => {
  const user = useSelector((state) => state.auth.user);
  const UserName = user ? user.name : 'Guest';
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [placeDetails,setPlaceDetails] =useState()
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const [orderDetails, setOrderDetails] = useState({
    quantity: 1,
    totalPrice: 0,
  });

  // Create a new Date object representing the current date and time
const currentDate = new Date();

// Extract various components of the date
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();

const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
const DeliveryDate = `${year}-${month}-${day + 5}`;

const handleQuantityChange = (e) => {
  const newQuantity = parseInt(e.target.value, 10);
  const newTotalPrice = (newQuantity * product.price).toFixed(2);

  setOrderDetails({
    ...orderDetails,
    quantity: newQuantity,
    totalPrice: newTotalPrice,
  });

  // Update placeDetails as well
  setPlaceDetails({
    ...placeDetails,
    productqty: newQuantity,
    totalPrice: newTotalPrice,
  });
};

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(response.data);

      // Initialize placeDetails after fetching product data
      const placeDetails = {
        username: user ? user.name : 'Guest',
        name: '',
        addres: '',
        phoneno: '',
        productid: id,
        producttitle: response.data.title, // Use the title from the fetched product
        productqty: orderDetails.quantity,
        totalPrice: (response.data.price * orderDetails.quantity).toFixed(2),
        date: formattedDate,
      };

      setPlaceDetails(placeDetails); // Assuming you have setPlaceDetails defined elsewhere
      setOrderDetails({
        ...orderDetails,
        totalPrice: response.data.price,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  fetchProduct();
}, [id]);

useEffect(() => {
  if (product.price !== undefined) {
    const newTotalPrice = orderDetails.quantity * product.price;
    setPlaceDetails((prevDetails) => ({
      ...prevDetails,
      totalPrice: newTotalPrice.toFixed(2),
    }));
  }
}, [orderDetails.quantity, product.price]);




  const handleFormSubmit = async (e) => {
    e.preventDefault();
     
    try {
      await axios.post(`http://localhost:9000/api/v1/order`,placeDetails);
      console.log("ddd",placeDetails);
      alert("Success");
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
 
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Navbar/>
      {/* <h5>UserName: "{UserName}"</h5> */}
      <div>
        <h3 className='h31'>Order Page</h3>
      </div>
      <form onSubmit={handleFormSubmit} className="order-page">
        {/* User Details */}
        <div><h6 style={{color:"Red"}}>User Details</h6></div>
        <div className="mb-3">
          <label htmlFor="emailplaceDetails" className="form-label">
            UserName
          </label>
          <input
            type="username"
            name="username"
            value={placeDetails.username}
            onChange={(e) =>
              setPlaceDetails({ ...placeDetails, [e.target.name]: e.target.value })
            }
            className="form-control"
            id="username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            name="name"
            value={placeDetails.name}
            onChange={(e) =>
              setPlaceDetails({ ...placeDetails, [e.target.name]: e.target.value })
            }
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="addres" className="form-label">
            Address
          </label>
          <input
            name="addres"
            value={placeDetails.addres}
            onChange={(e) =>
              setPlaceDetails({ ...placeDetails, [e.target.name]: e.target.value })
            }
            type="text"
            className="form-control"
            id="addres"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneno" className="form-label">
            PhoneNo
          </label>
          <input
            name="phoneno"
            value={placeDetails.phoneno}
            onChange={(e) =>
              setPlaceDetails({ ...placeDetails, [e.target.name]: e.target.value })
            }
            type="text"
            className="form-control"
            id="phoneno"
          />
        </div>
        <div>---------------------------------------------------------------------------------------</div>
        <div><h6 style={{color:"green"}}>Product Details</h6></div>
        <div className="mb-3">
          <label htmlFor="productid" className="form-label">
            ProductId
          </label>
          <input
            name="productid"
            value={placeDetails.productid}
            onChange={(e) =>
              setPlaceDetails({ ...placeDetails, [e.target.name]: e.target.value })
            }
            type="text"
            className="form-control"
            id="productid"
          />
        </div>
        <input
          name="title1"
          value={placeDetails.producttitle}
          onChange={(e) =>
            setPlaceDetails({ ...placeDetails, [e.target.name]: e.target.value })
          }
          type="text"
          className="form-control"
          id="name"
        />
        <img src={product.image} alt="Product" className='img1' />
        <h5 className='title1'>{product.title}</h5>
        <h5 className='price1'>Price: ${product.price}</h5>
        <h5 className='rating1'>Rating: {product.rating.rate}</h5>
        <div className='qty'>
          <label>
            Quantity:
            <input
              type="number"
              value={orderDetails.quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </label>
          <label>
            Total Price:
            <input
              type="text" // Use type "text" to display total price
              value={orderDetails.totalPrice} // Display total price from orderDetails
              id="totalPrice"
            />
          </label>
        </div>
        <div className='date'>
          <label>
            Order Date:
            <input
              name="date"
              value={placeDetails.date}
              onChange={(e) =>
                setPlaceDetails({ ...placeDetails, [e.target.name]: e.target.value })
              }
              className="form-control"
              id="date"
            />
          </label>
          <label>
            Delivery Date:
            <input
              name="date"
              value={DeliveryDate}
              onChange={(e) =>
                setPlaceDetails({ ...placeDetails, [e.target.name]: e.target.value })
              }
              className="form-control"
              id="date"
            />
          </label>
        </div>
        <button type="submit" className='buy'>
          Place Order
        </button>
      </form>
    </div>
  );
  
};

export default Order;