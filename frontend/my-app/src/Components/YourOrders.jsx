import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem'; // Corrected import statement
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const YourOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
      const url = `${process.env.REACT_APP_URL}/handleorder`;
      const response = await axios.post(url,{userId});
      setOrders(response.data); // Assuming the response contains an array of orders
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 pt-[10vh] py-8 min-h-[80vh]">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl font-bold my-4">Your Orders</h1>
        </div>

        <div className="mt-8">
          {orders.length > 0 ? (
            orders.map((order) => <OrderItem key={order._id} order={order} />)
          ) : (
            <p>Loading orders...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourOrders;
