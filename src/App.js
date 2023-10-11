import React, { useReducer, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initialState, reducer } from "./components/UseReducer";
import { Provider } from "react-redux";
import store from './redux/store/store.js';
import UserReg from "./common/User/UserReg";
import Edit from "./common/User/Edit";
import { FetchData } from "./common/User/FetchData";
import Admin from "./common/Admin/AdminReg";
import AdminLogAuth from "./common/Admin/AdminLog";
import Products from "./Product/Products";
import Product from "./Product/Product";
import Cart from "./Product/Cart";
import Login from "./common/Login";
import Order from "./orderpage/Order";
import { OrderDetails } from "./orderpage/OrderDetails";
import Detail from "./orderpage/Detail";
import { OrderDe } from "./orderpage/OrderDe";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Header from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";



export const UserContext = React.createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState); 

  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  return (
    <>
    <Provider store={store}>
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
      
        <Routes>
          
        <Route path="/landing" element={<Landing/>} /> 
          <Route path="/userreg" element={<UserReg/>} />
          <Route path="/edit/:id" element={<Edit/>} />
          <Route path="/userdetails" element={<FetchData/>} />
          {/* <Route path="/userlog" element={<UserLogingAuth/>} /> */}
          <Route path="/adminreg" element={<Admin/>} />
          <Route path="/adminlog" element={<AdminLogAuth/>} />
          <Route path="/products" element={<Products/>} />
          <Route path='/Product/:id' element={<Product/>} /> 
          <Route path="/cart" element={<Cart/>}/>
          {/* <Route path="/data" element={<DataDisplayPage user={user}/>}/> */}
        
          <Route path="/login" element={<Login/>} />
          <Route path="/order/:id" element={<Order/>} />
          <Route path="/orderdetails" element={<OrderDetails/>} />
          <Route path="/details" element={<Detail/>} />
          {/* <Route path="/payment" element={<Payment/>}/> */}
         
          <Route path="/" element={<Home/>} />  
          <Route path="/order" element={<OrderDe/>} />  
          <Route path="/footer" element={<Footer/>} /> 
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
       
          
        </Routes>
      
      </BrowserRouter>
      </UserContext.Provider>
    </Provider>
    </>
  );
};

export default App

