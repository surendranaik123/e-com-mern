import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

 const Admin = () => {
  const navigate=useNavigate()
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
 
  const handleSingup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/api/v1/adm", input);
      setInput({
        name: "",
        email: "",
        password: "",
      });
      alert("Success");
      navigate("/log")
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };
   
 
  return (
    <div className="container" style={{ marginLeft: "24rem" }}>
      <div className="row">
        <div className="col-md-7">
          <div style={{ backgroundColor: "blue" }}>
            <h1 className="text-white text-center mt-2">Admin Register Page</h1>
          </div>
        </div>
        <div className="col-md-7">
          <form onSubmit={handleSingup}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
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
                id="name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
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
                id="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                password
              </label>
              <input
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                name="password"
                type="text"
                className="form-control"
                id="password"
              />
            </div>
            <div>
             
            <div>
            You have account?  <Link to={"/adminlog"}>Admin Login</Link>
            </div>
            <br/>
            <button type="submit" className="btn btn-primary" >
              Sing up
            </button>
            </div>
          </form>  
        </div>
      </div>
    </div>
  );
};

export default Admin