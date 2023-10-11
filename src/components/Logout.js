import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../App';
import axios from 'axios';

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(null);

  useEffect(() => {
    setPreviousLocation(location.pathname);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/v1/logout');
      if (response.status === 200) {
        dispatch({ type: 'USER', payload: false });
        if (previousLocation) {
          navigate(previousLocation, { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
