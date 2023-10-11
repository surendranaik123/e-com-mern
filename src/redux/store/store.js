// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Reducer/authSlice';
import cartReducer from '../Reducer/cartReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart:cartReducer,
  
  },
});

export default store;
