import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Image } from 'cloudinary-react';
import { toast, ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils/utils';
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [productList, setProductList] = useState([]);
  const [totalPrice,setTotalPrice]=useState();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;



  const handleMinus = async (productId) => {
    let updatedQuantity;

    setProductList(prevList =>
      prevList.map(item => {
        if (item?.product?._id === productId && item.quantity > 1) {
          updatedQuantity = item.quantity - 1;
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      })
    );
    setTimeout(() => {

      if (updatedQuantity && updatedQuantity >= 2) {
        const url =  `${process.env.REACT_APP_URL}}/updatecart`;

        axios.post(url, { productId, quantity: updatedQuantity, userId: userId });
      }
    }, 500);
  };

  const handlePlus = async (productId) => {
    let updatedQuantity;

    setProductList(prevList =>
      prevList.map(item => {
        if (item?.product?._id === productId) {
          updatedQuantity = item.quantity + 1;
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      })
    );

    setTimeout(() => {

      if (updatedQuantity) {
        const url = `${process.env.REACT_APP_URL}/updatecart`;
        axios.post(url, { productId, quantity: updatedQuantity, userId: userId });
      }
    }, 500);
  };

  const handleCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const url = `${process.env.REACT_APP_URL}/cart`;

      const response = await axios.post(url, { userId });
      setProductList(response?.data || []); // Handle empty response

    } catch (error) {
      console.error('Cart error:', error);
    }
  };
  const handleCheckout = () => {
    // Clear the cart
    const prevProductList = productList;
    console.log(total);
    setTotalPrice(total);
    setProductList([]);

    // Display success message
    handleSuccess('order successful')

    const url = `${process.env.REACT_APP_URL}/checkout`;
    axios.post(url, { userId, items: prevProductList, total :total });
  };

  const handleDelete = async (productId) => {
    console.log('handle delete is called');
    try {
      const url = `${process.env.REACT_APP_URL}/removefromcart`
      const response = await axios.post(url, {
        userId: userId,
        productId: productId
      })

      if (response.status === 200) {
        // Update the productList state by removing the deleted product
        const updatedProductList = productList.filter(
          (item) => item.product._id !== productId
        );
        handleSuccess('product removed from cart');
        setProductList(updatedProductList);

      } else {
        console.error('Failed to remove product from cart:', response.data);
      }

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleCart();
  }, []);
  const total = (
    productList.reduce((total, item) => total + item.product.price * item.quantity, 0) + 1.99
  ).toFixed(2);
  return (

    <div className="bg-gray-100 min-h-screen py-8 px-4 pt-20 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            {productList.length === 0 ? (
              <p>No products in the cart.</p>
            ) : (
              productList.map(item => (
                <div key={item.product._id} className="bg-white rounded-lg shadow-md p-4 mb-4">

                  {/* Grid & Flex for Mobile */}
                  <div className="block md:hidden">
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="col-span-1">
                        <div className="w-20 h-20 flex-shrink-0">
                          <Image
                            cloudName="dloe8x9e4"
                            publicId={item?.product?.img}
                            className="w-full h-full object-cover rounded-lg"
                            style={{ height: "100%", width: "100%" }}
                          />
                        </div>
                      </div>
                      <div className="col-span-2 flex flex-col">
                        <span className="font-semibold">{item.product.name}</span>
                        <div className="flex justify-between mt-2">
                          <span>${item.product.price}</span>
                          <div className="flex items-center space-x-2">
                            <button onClick={() => handleMinus(item.product._id)} className="border rounded-md py-1 px-2">-</button>
                            <span className="text-center w-8">{item.quantity}</span>
                            <button onClick={() => handlePlus(item.product._id)} className="border rounded-md py-1 px-2">+</button>
                          </div>
                          <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                          <MdDelete
                            className='hover:text-yellow-500 text-red-500 cursor-pointer'
                            onClick={() => handleDelete(item.product._id)}
                          />

                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table for Tablet and Desktop */}
                  <div className="hidden md:block">
                    <table className="w-full table-auto">
                      <thead>
                        <tr>
                          <th className="text-left font-semibold">Product</th>
                          <th className="text-left font-semibold">Price</th>
                          <th className="text-left font-semibold">Quantity</th>
                          <th className="text-left font-semibold">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-20 h-20 flex-shrink-0">
                                <Image
                                  cloudName="dloe8x9e4"
                                  publicId={item?.product?.img}
                                  className="w-full h-full object-cover rounded-lg"
                                  style={{ height: "100%", width: "100%" }}
                                />
                              </div>
                              <span className="font-semibold">{item.product.name}</span>
                            </div>
                          </td>
                          <td className="py-4">${item.product.price}</td>
                          <td className="py-4">
                            <div className="flex items-center space-x-2">
                              <button onClick={() => handleMinus(item.product._id)} className="border rounded-md py-1 px-2">-</button>
                              <span className="text-center w-8">{item.quantity}</span>
                              <button onClick={() => handlePlus(item.product._id)} className="border rounded-md py-1 px-2">+</button>
                            </div>
                          </td>
                          <td className="py-4">${(item.product.price * item.quantity).toFixed(2)}</td>
                          <td><MdDelete
                            className='hover:text-yellow-500 text-red-500 cursor-pointer'
                            onClick={() => handleDelete(item.product._id)}
                          />
                          </td>
                        </tr>
                      </tbody>

                    </table>

                  </div>
                </div>
              ))
            )}
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${productList.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>$1.99</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  ${total}
                </span>
              </div>
              <button onClick={handleCheckout} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Cart;
