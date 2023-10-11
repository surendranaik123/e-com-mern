import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const SingalUser = ({ id }) => {
   const [data, setData] = useState([]);
   console.log(data);

   useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:9000/api/v1/users/single/${id}`);
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
   }, [id]);

  return (
    <div>
      <h2>User Details</h2>
      {data ? (
        <div>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          {/* Render other user details here */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  )
}
