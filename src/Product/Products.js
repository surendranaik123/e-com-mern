import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { Form, NavLink, useLocation, useParams } from 'react-router-dom';
import "../css/product.css"
import  Home  from '../pages/Home';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { shuffle } from 'lodash';






const Products = () => {
  const { Search } = Input;
  const location = useLocation()
  const [data, setData] = useState([]);
  const [perpage, setPerpage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("");
  const [user, setUser] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");

  console.log(data);
  // Extract the id parameter from the route
  const { id } = useParams();

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  const items = [
    {
      label:<h5 className="btn1" onClick={() => filterProduct("")}>All Products</h5>,
      key: 'All Products',
    },

    {
      label:<h5 className="btn1" onClick={() => filterProduct("men's clothing")}>Men's Clothing</h5> ,
      key: 'Mens Clothing',
    },

    {
      label:<h5 className="btn1" onClick={() => filterProduct("women's clothing")}>Women's Clothing</h5>,
      key: 'Womens Clothing',
    },

    {
      label:<h5 className="btn1" onClick={() => filterProduct("jewelery")}>Jewelry</h5>,
      key: 'Jewelry',
    },

    {
      label:<h5 className="btn1" onClick={() => filterProduct("electronics")}>Electronic</h5>,
      key: 'Electronic',
    },
  ];

  const App = () => (
    <Dropdown menu={{items,onClick,}}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <button className='btn1'>Click menu item<DownOutlined /></button>
        </Space>
      </a>
    </Dropdown>
  );


  useEffect(() => {
    // Fetch product data from API
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        console.log("API Response:", res.data);
        // Shuffle the data randomly
        const shuffledData = shuffle(res.data);
        setData(shuffledData);
        setPerpage(shuffledData.slice(0, 4));
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  
    // Only fetch user data if id is available
    if (id) {
      axios.get(`http://localhost:9000/api/v1/users/single/${id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    // Update products per page when category, data, or searchCategory changes
    const offset = currentPage * 4;
    let filteredData = data;
  
    if (currentCategory) {
      filteredData = filteredData.filter((item) => item.category === currentCategory);
    }
  
    if (searchCategory) {
      filteredData = filteredData.filter((item) => item.category === searchCategory);
    }
  
    setPerpage(filteredData.slice(offset, offset + 4));
  }, [currentCategory, data, currentPage, searchCategory]);
  

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filterProduct = (cat) => {
    setCurrentCategory(cat);
    setCurrentPage(0); // Reset to first page when applying filter
  };

  const onSearch = (cat) => {
    setSearchCategory(cat);
    setCurrentPage(0); // Reset to first page when applying filter
  };
  

  return (
    <>
    <Navbar/>
      
      {/* <h5 style={{margin:"40px"}}>UserEmail:"{location.state?.id || 'Guest'}"</h5> */}

      <div className='back'>
   
      <center>
          <Search className="search" placeholder="Search by category" onSearch={onSearch}
            enterButton style={{ width: "450px", padding: "20px" }} />
        </center>
        <div className='display' >
          <App/>

          <div className='home'>
            {perpage.map((product) => (
              <div className='product' key={product.id}>
                <h5 style={{ color: "blue" }}>{product.category}</h5>
                <img src={product.image} className="image" alt={`Product: ${product.title}`} />
                <h4>{product.title && product.title.substring(0, 15)}</h4>
                <h4>Price:${product.price}</h4>
                <h5>Rating: {product.rating.rate}</h5>
             
                  <NavLink to={`/product/${product.id}`} >
                    <button className='add'>Add To Cart</button>
                  </NavLink>
                  <NavLink to={`/order/${product.id}`} state={{ UserEmail: location.state?.id }}>
                    <button className='buy'>Buy Now</button>
                  </NavLink>
             
              </div>
            ))}
          </div>


          <div>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil((currentCategory ? data.filter(item => item.category === currentCategory) : data).length / 4)}
              marginPagesDisplayed={1}
              pageRangeDisplayed={10}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Products;
