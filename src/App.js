// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Nav } from "./Product/Nav";
// import Admin from "./Admin/AdminReg";
// import AdminLogAuth from "./Admin/AdminLog";
// import UserReg from "./User/UserReg";
// import UserLogingAuth from "./User/UserLog";
// import Edit from "./User/Edit";
// import { FetchData } from "./User/FetchData";
// import Products from "./Product/Products";
// import  Product  from "./Product/Product";
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import Cart from "./Product/Cart";
// const App = () => {
//   return (
//     <>
//     <Provider store={store}>
//       <BrowserRouter>
//        <Nav/>
//         <Routes>

//           <Route path="/userreg" element={<UserReg/>} />
//           <Route path="/edit/:id" element={<Edit/>} />
//           <Route path="/fetch" element={<FetchData/>} />
//           <Route path="/userlog" element={<UserLogingAuth/>} />
//           {/* <Route path="/" element={<Nav/>}/> */}
//           <Route path="/adminreg" element={<Admin/>} />
//           <Route path="/adminlog" element={<AdminLogAuth/>} />
//           <Route path="/" element={<Products/>} />
//           <Route path='/Product/:id' element={<Product/>} /> 
//           <Route path="/cart" element={<Cart/>}/>
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//     </>
//   );
// };

// export default App



import React, { useReducer } from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom'; // Import 'Switch'
import { Cart } from './components/Cart';
import { Navbar } from './components/Navbar';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Order } from './components/Order';
import Login from './components/Login';
import Logout from './components/Logout';
import { initialState, reducer } from './components/UseReducer';

export const UserContext = React.createContext();

const Routing = () => {
  return (
    <Routes>
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <Provider store={store}>
        <UserContext.Provider value={{ state, dispatch }}>
          <BrowserRouter>
            <Navbar />
            <Routing/>
          </BrowserRouter>
        </UserContext.Provider>
      </Provider>
    </div>
  );
};

export default App;



