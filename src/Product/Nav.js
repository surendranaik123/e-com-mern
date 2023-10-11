import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';


export const Nav = () => {


  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    navigate("/")
    if (selectedOption === "adminreg") {
      navigate("/adminreg");
    } else if (selectedOption === "userreg") {
      navigate("/userreg");
    }
  };


  return (
    <div>
         <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
           <div className="container">
            <NavLink className="navbar-brand fw-bold fs-4" to="/"> NEW COLLECTION</NavLink>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
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
               </ul>

                        <div className="btn1">
                            
                             <NavLink to="/cart" className="">
                             <i className="bi bi-cart "></i> Cart (0)
                             </NavLink>

                             <NavLink to="/order" className="btn">
                             <i className="bi bi-order "></i> Order()
                             </NavLink>
                            
                             <button className='btn'>Logout </button>

                            <NavLink to="/" className="btn ">
                             <i className="bi bi-person"></i>   
                             <select onClick={handleSelectChange}>
                             <option value="userreg">User Login</option>
                             <option value="adminreg">Admin Login</option>
                      
                             </select>
                            </NavLink>
                        
                        </div>

                    </div>
                </div>
            </nav>
        </div>
  );
};
