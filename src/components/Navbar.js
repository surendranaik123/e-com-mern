import React, {useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../css/product.css";
// import { UserContext } from "../App";
// import { Input } from "antd";
import {
  ShoppingCartOutlined,
  UsergroupAddOutlined,

  FireOutlined,
} from "@ant-design/icons";
import { logout } from "../redux/Reducer/authSlice";
import img from "../assets/nav_logo.jpg";
import img1 from "../assets/profilepic.svg";

import NavDropdown from "react-bootstrap/NavDropdown";

import DropdownItem from "react-bootstrap/esm/DropdownItem";

function Navbar() {
  // const { Search } = Input;
  
  // const { state, dispatch } = useContext(UserContext);
  const state1 = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatchRedux = useDispatch();

  console.log('User Data:', user);
  console.log('User Data:', state1);

  //order
  // const orders = useSelector((state) => state.orders);

  const handleLogout = () => {
    // Perform any necessary cleanup or API calls here.
    dispatchRedux(logout());
    navigate("/");
  };

  const handlecart = () => {
    // Perform any necessary cleanup or API calls here.
 
    navigate("/cart");
  };
  const handleorder = () => {
    // Perform any necessary cleanup or API calls here.
    navigate(`/order?username=${user ? user.name : ""}`);
  };


  const [showProfileMenu, setShowProfileMenu] = useState(true);

  const handleProfileClick = () => {
    setShowProfileMenu(true);
  };

  const handleSettingClick = () => {
    setShowProfileMenu(false);
  };
  console.log(showProfileMenu);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div className="container">
          <center>
            <div style={{ display: "flex" }}>
              {/* Add your logo here */}
              <img
                src={img}
                alt="image"
                style={{ height: "70px", width: "70px", marginLeft: "-40px" }}
              />
              <NavLink
                className="navbar-brand fw-bold fs-2"
                to="/"
                style={{ marginTop: "10px", marginLeft: "10px" }}
              >
                E-com
              </NavLink>
            </div>
          </center>
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
          <div id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li
                className="nav-item"
                style={{
                  marginLeft: user ? "0px" : "0px",
                  marginTop: "10px",
                }}
              >
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item" style={{ marginTop: "10px" }}>
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item" style={{ marginTop: "10px" }}>
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li
                className="nav-item"
                style={{ marginTop: "10px", marginRight: "30px" }}
              >
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>

              {/* <Search style={{ marginLeft: "10px" }} className="search" placeholder="input search text" onSearch={onSearch} enterButton /> */}
              <li>
                <NavLink to="/cart" className="cartnav" style={{}}>
                  <ShoppingCartOutlined /> Cart ({state1.length})
                </NavLink>
              </li>

              {isAuthenticated ? (
                <>
                  <li>
                    <NavLink
                      to={`/order?username=${user ? user.fname : ""}`}
                      className="order"
                    >
                      <FireOutlined /> Order
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to="/login" className="loginnav">
                    <UsergroupAddOutlined /> UserLogin
                  </NavLink>
                </li>
              )}

              
                 <center style={{marginLeft:"20px",marginTop:"8px",marginRight:"-520px",display:"flex"}}>
              
                 <img src={img1} alt='image' style={{height:"50px",width:"50px"}} onClick={handleProfileClick}/>
                
               
                <NavDropdown 
                  title={user ? user.fname : "Guest"}
                  id="basic-nav-dropdown" style={{marginTop:"10px",}}
                  
                >
                   {(!user && <DropdownItem href="/login">
                      login with user credentials
                    </DropdownItem>)} 
                    {user && (
                  <>
                    <DropdownItem
                      onClick={handlecart}
                      className="  inline-flex items-center px-2 py-2 border  border-gray-500 text-base font-medium rounded-md text-black hover:bg-emerald-600"
                    >
                     MY Cart ({state1.length})
                    </DropdownItem>

                    <DropdownItem
                    onClick={handleorder}
                     
                      className="  inline-flex items-center px-2 py-2 border  border-gray-500 text-base font-medium rounded-md text-black hover:bg-emerald-600"
                    >
                     My Orders
                    </DropdownItem>
                  
                    <DropdownItem
                      onClick={handleSettingClick}
                      className="  inline-flex items-center px-2 py-2 border  border-gray-500 text-base font-medium rounded-md text-black hover:bg-emerald-600"
                    >
                      Setting
                    </DropdownItem>
                    <DropdownItem
                      onClick={handleLogout}
                      className="  inline-flex items-center px-2 py-2 border  border-gray-500 text-base font-medium rounded-md text-black hover:bg-emerald-600"
                    >
                      Logout
                    </DropdownItem>
                    
                  </>
                   )} 
                </NavDropdown>
                
                </center>
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
