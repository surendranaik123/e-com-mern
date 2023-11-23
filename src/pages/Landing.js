import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Carousel} from "antd";
import { Input } from "antd";

import { shuffle } from "lodash";

import img1 from "../assets/shoping1.png";
import img2 from "../assets/shoping2.png";
import img3 from "../assets/shoping3.png";
import Rating from "react-rating-stars-component";

import "../css/display.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const Landing = () => {
  const { Search } = Input;
  const location = useLocation();
  const [data, setData] = useState([]);
  const [perpage, setPerpage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const navigate = useNavigate();
  const [productsToShow, setProductsToShow] = useState(10);
  // const [rating, setRating] = useState([0, 0, 0, 0, 0]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log(data);
  const [product, setProduct] = useState([]);

  const [Loading, setLoading] = useState(true);

  console.log(product,Loading);
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/v1/productdata")
      .then((res) => {
        console.log("API Response:", res.data);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false);
      });
  }, []);

  // const onClick = ({ key }) => {
  //   message.info(`Click on item ${key}`);
  // };

  // const items = [
  //   {
  //     label: (
  //       <h5 className="btn1" onClick={() => filterProduct("")}>
  //         All Products
  //       </h5>
  //     ),
  //     key: "All Products",
  //   },
  //   {
  //     label: (
  //       <h5 className="btn1" onClick={() => filterProduct("men's clothing")}>
  //         Men's Clothing
  //       </h5>
  //     ),
  //     key: "Mens Clothing",
  //   },
  //   {
  //     label: (
  //       <h5 className="btn1" onClick={() => filterProduct("women's clothing")}>
  //         Women's Clothing
  //       </h5>
  //     ),
  //     key: "Womens Clothing",
  //   },
  //   {
  //     label: (
  //       <h5 className="btn1" onClick={() => filterProduct("jewelery")}>
  //         Jewelry
  //       </h5>
  //     ),
  //     key: "Jewelry",
  //   },
  //   {
  //     label: (
  //       <h5 className="btn1" onClick={() => filterProduct("electronics")}>
  //         Electronic
  //       </h5>
  //     ),
  //     key: "Electronic",
  //   },
  // ];

  // const App = () => (
  //   <Dropdown menu={{ items, onClick }}>
  //     <a onClick={(e) => e.preventDefault()}>
  //       <Space>
  //         <button className="btn1">
  //           Click menu item
  //           <DownOutlined />
  //         </button>
  //       </Space>
  //     </a>
  //   </Dropdown>
  // );

  useEffect(() => {
    // Fetch product data from API
    axios
      .get("https://fakestoreapi.com/products")
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
  }, []);

  useEffect(() => {
    // Update products per page when category, data, or searchCategory changes
    const offset = currentPage * 4;
    let filteredData = data;

    if (currentCategory) {
      filteredData = filteredData.filter(
        (item) => item.category === currentCategory
      );
    }

    if (searchCategory) {
      filteredData = filteredData.filter(
        (item) => item.category === searchCategory
      );
    }

    setPerpage(filteredData.slice(offset, offset + 4));
  }, [currentCategory, data, currentPage, searchCategory]);

  // const filterProduct = (cat) => {
  //   setCurrentCategory(cat);
  //   setCurrentPage(0); // Reset to the first page when applying filter
  // };

  const onSearch = (cat) => {
    setSearchCategory(cat);
    setCurrentPage(0); // Reset to the first page when applying filter
  };
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const Product1 = () => {
    return (
      <>
        <div className="back1">
          <div className="display">
            <div className="home1">
              {perpage.map((product) => (
                <div
                  key={product.id}
                  style={{
                    border: "7px solid white",
                    margin: "20px",
                    height: "auto",
                    paddingBottom: "20px",
                  }}
                >
                  <image
                    src={product.image}
                    className="prodduct_img"
                    alt="image"
                    // alt={`Product: ${product.title}`}
                  />

                  <h5
                    style={{
                      marginLeft: "30px",
                      marginTop: "-10px",
                      fontSize: "1.3rem",
                    }}
                  >
                    {product.category}
                  </h5>
                  <div style={{display:"flex"}}>
                  <h5
                    style={{
                      marginLeft: "20px",
                      marginBottom: "10px",
                      marginTop: "10px",
                      fontSize: "1.1rem",
                    }}
                  >
                    Price:${product.price}
                  </h5>
                  <h5
                    style={{
                      marginLeft: "30px",
                      marginBottom: "30px",
                      fontSize: "1.1rem",
                      marginTop: "5px",
                    }}
                  >
                    <Rating
                      count={5}
                      value={product.rating.rate}
                      size={24}
                      activeColor="green"
                    />
                  </h5>
                  </div>

                  <div style={{ marginTop: "-30px", marginLeft: "40px" }}>
                    {isAuthenticated ? (
                      <>
                        <NavLink to={`/product/${product.id}`}>
                          <button className="add">Add To Cart</button>
                        </NavLink>
                        <NavLink
                          to={`/order/${product.id}`}
                          state={{ UserEmail: location.state?.id }}
                        >
                          <button className="buynow">Buy Now</button>
                        </NavLink>
                      </>
                    ) : (
                      <NavLink to={`/product/${product.id}`}>
                        <button className="add">Add To Cart</button>
                      </NavLink>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "70px" }}>
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(
                  (currentCategory
                    ? data.filter((item) => item.category === currentCategory)
                    : data
                  ).length / 4
                )}
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
      </>
    );
  };

  const ProductAll = ({ data }) => {
    const loadMoreProducts = () => {
      setProductsToShow(data.length);
    };

    return (
      <>
        <div style={{ backgroundColor: "lightgray", padding: "40px" }}>
          <div style={{ display: "flex" }}>
            <h3>New Arrival</h3>

            {productsToShow < data.length && (
              <h5 style={{ marginLeft: "1000px" }} onClick={loadMoreProducts}>
                {" "}
                View More <i className="bi bi-arrow-right"></i>
              </h5>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              margin: "20px",
            }}
          >
            {data.slice(0, productsToShow).map((product) => (
              <div key={product.id} style={{ margin: "10px" }}>
                <img
                  src={product.image}
                  className="prodduct_img"
                  alt={`Product: ${product.title}`}
                />
                <h5
                  style={{
                    marginLeft: "10px",
                    marginTop: "-10px",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  {product.category}
                </h5>
                <h6
                  style={{
                    marginLeft: "10px",
                    marginBottom: "20px",
                    display: "flex",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {" "}
                    Price:{" "}
                  </div>{" "}
                  <div style={{ fontSize: "1.2rem", color: "blue" }}>
                    ${product.price}
                  </div>
                </h6>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const handleProducts = () => {
    navigate("/productdata");
  };
  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#D1EAF0" }}>
        <center>
          <Search
            className="search"
            placeholder="Search by category"
            onSearch={onSearch}
            enterButton
            style={{
              width: "550px",
              backgroundColor: "blue",
              marginTop: "40px",
              marginBottom: "10px",
            }}
          />
        </center>

        <Carousel autoplay>
          <div>
            <div className="dis">
              <div className="hero">
                <p style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                  {" "}
                  Fashion Hunt
                </p>
                <h1
                  style={{
                    fontSize: "3.6rem",
                    fontWeight: "bold",
                    marginTop: "20px",
                    marginBottom: "30px",
                  }}
                >
                  Shop the Hottest Brands and Designs at Shop
                </h1>
                <button
                  style={{
                    borderRadius: "5px",
                    padding: "5px",
                    width: "auto",
                    height: "45px",
                    backgroundColor: "#add8e6",
                    border: "2px solid #add8e6",
                    fontSize: "1.2rem",
                  }}
                  onClick={handleProducts}
                >
                  Shop Now ..
                </button>
              </div>
              <image className="home_img" src={img1} alt="image" />
            </div>
          </div>

          <div>
            <div
              className="dis"
              style={{ backgroundColor: "lightgoldenrodyellow" }}
            >
              <div className="hero">
                <p style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                  {" "}
                  Fashion Hunt
                </p>

                <h1
                  style={{
                    fontSize: "3.6rem",
                    fontWeight: "bold",
                    marginTop: "20px",
                    marginBottom: "30px",
                  }}
                >
                  Shop the Hottest Brands and Designs at Shop
                </h1>

                <button
                  style={{
                    borderRadius: "5px",
                    padding: "5px",
                    width: "auto",
                    height: "45px",
                    backgroundColor: "lightsalmon",
                    border: "2px solid #add8e6",
                    fontSize: "1.2rem",
                  }}
                  onClick={handleProducts}
                >
                  Shop Now ..
                </button>
              </div>
              <image className="home_img" src={img2} alt="image" />
            </div>
          </div>
          <div>
            <div className="dis">
              <div className="hero">
                <p style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                  {" "}
                  Fashion Hunt
                </p>

                <h1
                  style={{
                    fontSize: "3.6rem",
                    fontWeight: "bold",
                    marginTop: "20px",
                    marginBottom: "30px",
                  }}
                >
                  Shop the Hottest Brands and Designs at Shop
                </h1>

                <button
                  style={{
                    borderRadius: "5px",
                    padding: "5px",
                    width: "auto",
                    height: "45px",
                    backgroundColor: "#add8e6",
                    border: "2px solid #add8e6",
                    fontSize: "1.2rem",
                  }}
                  onClick={handleProducts}
                >
                  Shop Now ..
                </button>
              </div>
              <image className="home_img" src={img3} alt="image" />
            </div>
          </div>
        </Carousel>
      </div>

      <div className="content opacity-image">
        <div style={{ display: "flex", marginLeft: "50px", marginTop: "13px" }}>
          <div>
            <i
              className="bi bi-cart3"
              style={{
                color: "#40E0D0",
                fontSize: "35px",
                marginRight: "10px",
              }}
            ></i>
          </div>

          <div>
            <h6 style={{ color: "white", fontWeight: "bold" }}>
              Free Shipping
            </h6>
            <h6 style={{ color: "white" }}>When ordering over $1000</h6>
          </div>
        </div>

        <div style={{ display: "flex", marginLeft: "50px", marginTop: "13px" }}>
          <div>
            <i
              className="bi bi-arrow-clockwise"
              style={{
                color: "#40E0D0",
                fontSize: "35px",
                marginRight: "10px",
              }}
            ></i>
          </div>

          <div>
            <h6 style={{ color: "white", fontWeight: "bold" }}>Free Return</h6>
            <h6 style={{ color: "white" }}>Get Return within 30 days</h6>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginLeft: "50px",
            marginTop: "13px",
            marginRight: "20px",
          }}
        >
          <div>
            <i
              className="bi bi-file-lock"
              style={{
                color: "#40E0D0",
                fontSize: "35px",
                marginRight: "10px",
              }}
            ></i>
          </div>
          <div>
            <h6 style={{ color: "white", fontWeight: "bold" }}>
              Secure Payment
            </h6>
            <h6 style={{ color: "white" }}>100% Secure Online Payment</h6>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginLeft: "50px",
            marginTop: "13px",
            marginRight: "20px",
          }}
        >
          <div>
            <i
              className="bi bi-trophy"
              style={{
                color: "#40E0D0",
                fontSize: "35px",
                marginRight: "10px",
              }}
            ></i>
          </div>
          <div>
            <h6 style={{ color: "white", fontWeight: "bold" }}>Best Quality</h6>
            <h6 style={{ color: "white" }}>Original Product Guarenteed</h6>
          </div>
        </div>
      </div>

      {/* {isAuthenticated ? (
  <>
 <Product1 />
  </>
) :( <ProductAll data={data} />)} */}

      <Product1 />

      <div className="home_back">
        <div class="w-full xl:p-12 p-5">
          <div class="countdown-wrapper w-full flex space-x-[23px] mb-10">
            <div class="countdown-item">
              <div class="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                <span class="font-700 sm:text-[30px] text-[14px] text-[#EB5757]">
                  0
                </span>
              </div>
              <p class="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                Days
              </p>
            </div>
            <div class="countdown-item">
              <div class="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                <span class="font-700 sm:text-[30px] text-[14px] text-[#2F80ED]">
                  0
                </span>
              </div>
              <p class="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                Hours
              </p>
            </div>
            <div class="countdown-item">
              <div class="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                <span class="font-700 sm:text-[30px] text-[14px] text-[#219653]">
                  0
                </span>
              </div>
              <p class="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                Minutes
              </p>
            </div>
            <div class="countdown-item">
              <div class="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                <span class="font-700 sm:text-[30px] text-[14px] text-[#EF5DA8]">
                  0
                </span>
              </div>
              <p class="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                Seconds
              </p>
            </div>
          </div>
          <div class="countdown-title mb-4 ml-5">
            <h1 class="text-[44px] text-qblack font-medium">WOO! Flash Sale</h1>
            <p class="text-[18px] text-qblack leading-7">
              You get into the 2k+ best Products in Flash offer with a<br></br>
              special-shaped sofa for sale.
            </p>
          </div>
          <div class=" w-[100px] h-8 border-b border-qblack ml-5">
            <div class=" h-full inline-flex space-x-2  items-center">
              <span class="text-sm font-600 tracking-wide leading-7 " onClick={handleProducts}>
                Shop Now
              </span>
            
            </div>
          </div>
        </div>
      </div>

      <ProductAll data={data} />
    </>
  );
};

export default Landing;
