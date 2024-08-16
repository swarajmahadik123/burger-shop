import { Image } from "cloudinary-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../utils/utils";
import axios from "axios";

const OrderItem = ({ order }) => {
  const [isCancelled, setIsCancelled] = useState(order.cancel); // Initialize state based on the `cancel` field
  const navigate = useNavigate(); // React Router hook for navigation

  // Function to handle product click and navigate to product detail page
  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`); // Navigate to product detail page
  };

  // Function to handle cancel order button click
  const handleCancelOrder = async (orderId) => {
    setIsCancelled(true); // Set the button state to cancelled
    try {
      const url = `${process.env.REACT_APP_URL}/cancelorder`;
      await axios.post(url, { orderId });
      handleSuccess('Order cancelled successfully');
    } catch (error) {
      console.error('Error cancelling order:', error);
      setIsCancelled(false); // Reset state if there is an error
    }
  };

  return (
    <div className="border-b border-gray-400 py-4">
      <div className="flex flex-wrap items-center">
        {/* Iterate over each product in the order and display its image and name */}
        {order.items.map((item) => (
          <div
            key={item._id}
            onClick={() => handleProductClick(item.product._id)} // Handle product click
            className="flex flex-col items-center mx-4 cursor-pointer" // Added cursor-pointer for better UX
          >
            <Image
              cloudName="dloe8x9e4"
              publicId={item.product.img}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <h2 className="text-sm font-bold mt-2">{item.product.name}</h2>
          </div>
        ))}
        {/* Display the total price and Cancel Order button at the end of the row */}
        <div className="ml-auto flex items-center">
          <span className="font-bold text-xl mr-4">${order.total.toFixed(2)}</span>
          {!order.cancel && (
            <button
              onClick={() => handleCancelOrder(order._id)}
              className={`font-bold py-2 px-4 rounded border transition-colors duration-200 ${
                isCancelled
                  ? "bg-gray-400 text-gray-700 border-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-100 hover:border-red-500 text-white hover:text-red-500 border-transparent"
              }`}
              disabled={isCancelled} // Disable the button if the order is cancelled
            >
              {isCancelled ? "Order Cancelled" : "Cancel Order"}
            </button>
          )}
          {order.cancel && (
            <button
              className="font-bold py-2 px-4 rounded border bg-gray-400 text-gray-700 border-gray-400 cursor-not-allowed"
              disabled
            >
              Order Cancelled
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderItem;
