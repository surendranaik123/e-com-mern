import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import "../css/product.css";
import { UserContext } from "../App"

export const Navbar = () => {
  const { state, dispatch } = useContext(UserContext)
  const state1 = useSelector((state) => state.cartReducer)
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    navigate("/")
    if (selectedOption === "adminreg") {
      navigate("/adminreg");
    } else if (selectedOption === "login") {
      navigate("/login");
    }
  };

  const RenderMenu = () => {
    if (state) {
      return (<>

<li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/"> Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/"> Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about"> About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact"> Contact </NavLink></li>

              <li>
                <NavLink to="/cart" className="btn">
                  <i className="bi bi-cart"></i> Cart (0)
                </NavLink>
              </li>

              <li>
                <NavLink to="/order" className="btn">
                  <i className="bi bi-order "></i> Order(0)
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout" className="btn">
                  Logout
                </NavLink>
              </li>

      </>)

    } else {
           return(<>
           
<li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/"> Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/"> Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about"> About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact"> Contact </NavLink></li>

              <li>
                <NavLink to="/cart" className="btn">
                  <i className="bi bi-cart"></i> Cart (0)
                </NavLink>
              </li>

             
              <li>
                <NavLink to="/login" className="btn">User Login
                  {/* <i className="bi bi-person"></i>
                  <select onClick={handleSelectChange}>
                    <option value="login">User Login</option>
                    <option value="adminreg">Admin Login</option>

                  </select> */}
                </NavLink>
              </li>
           
           </>)
    }
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4" to="/"> NEW COLLECTION</NavLink>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <RenderMenu/>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
