import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import img2 from "../image/img.jpg"
import {UserContext} from "../App"


const Login = () => {
 const {state,dispatch}=useContext(UserContext)
    const navigate=useNavigate()
  const [data, setData] = useState([]);
  const [input, setInput] = useState({ name: '', email: '' }); // Add 'name' to initial state
  const [loginError, setLoginError] = useState('');
  const [loginErrorname, setLoginErrorname] = useState('');

  useEffect(() => {
    const getAllData = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/v1/users");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getAllData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
  
    const user = data.find(
      (userData) =>
        userData.email.toLowerCase() === input.email.toLowerCase() &&
        userData.name === input.name
    );
  
    if (user) {
      // Successful login
      dispatch({type:"USER" , payload:true})
      setLoginError('');
      setLoginErrorname('');
      alert('Login successful!');
      navigate('/logout');
    } else {
      if (!data.some((userData) => userData.email.toLowerCase() === input.email.toLowerCase())) {
        // Invalid email
        setLoginError('Invalid email');
      } else {
        setLoginError('');
      }
  
      if (!data.some((userData) => userData.name === input.name)) {
        // Invalid name
        setLoginErrorname('Invalid name');
      } else {
        setLoginErrorname('');
      }
    }
    
  };
  

  return (
    <>
      <div className="container" style={{ marginLeft: "24rem"}}>
        <div className="row">
          <div className="col-md-7 ">
            <div>
              <center>
            {/* <img src={img1} alt='image' style={{height:"100px",}}/> */}
            <img src={img2} alt='image' style={{height:"100px",}}/>
            </center>
            </div>
            <div style={{ backgroundColor: "blue" }}>
              <h1 className="text-white text-center mt-2">User Login Page</h1>
            </div>
          </div>
          <div className="col-md-7">
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  name="name"
                  value={input.name}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
             {  loginErrorname && <div style={{ color: 'red' }}>{  loginErrorname}</div>}
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Email
                </label>
                <input
                  name="email"
                  value={input.email}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  type="email"
                  className="form-control"
                  id="exampleInputPassword1"
                />
                         {loginError && <div style={{ color: 'red' }}>{loginError}</div>}

              </div>
              <div>
              Don't have account?<Link to={"/userreg"}>Admin Register</Link>
              </div>
              <br/>
              <button type="submit" className="btn btn-primary">
                Singin
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;