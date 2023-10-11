import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import "../css/product.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NavLink } from 'react-router-dom';


const Products = () => {
  const [data, setData] = useState([]);
  const [perpage, setPerpage] = useState([]); // State for products per page
  const [currentPage, setCurrentPage] = useState(0); // State for current page
  const [currentCategory, setCurrentCategory] = useState(""); // State for current category


  // Fetch data from API
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then((res) => {
      setData(res.data);
      // Set initial products per page
      setPerpage(res.data.slice(0, 4));
    });
  }, []);




  useEffect(() => {
    // Update products per page when category or data changes
    const offset = currentPage * 4;
    const filteredData = currentCategory
      ? data.filter(item => item.category === currentCategory)
      : data;
    setPerpage(filteredData.slice(offset, offset + 4));
  }, [currentCategory, data, currentPage]);



  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };


  const filterProduct = (cat) => {
    setCurrentCategory(cat);
    setCurrentPage(0); // Reset to first page when applying filter
  };

  return (
    <>
      <div className='btn1'>
        <button className="buy" onClick={() => filterProduct("")}>All</button>
        <button className="add" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
        <button className="buy" onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
        <button className="add" onClick={() => filterProduct("jewelery")}>Jewelry</button>
        <button className="buy" onClick={() => filterProduct("electronics")}>Electronic</button>
      </div>
      <div className='home'>
        {perpage.map((post) => (
          <div className='product' key={post.id}>
            <h5>{post.category}</h5>
            <img src={post.image} className="image" alt={`Product: ${post.title}`} />
            <h4>{post.title.substring(0, 15)}</h4>
            <h4>Price: ${post.price}</h4>
            <h5>Rating: {post.rating.rate}</h5>
            <NavLink to={`/product/${post.id}`} class="btn btn-outline-dark">
                      <button className='rounded-2'>Add To Cart</button> 
                      </NavLink>
            <button className='buy'>Buy Now</button>
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
    </>
  );
};

export default Products;