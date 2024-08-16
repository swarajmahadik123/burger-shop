import React, { useEffect, useState } from 'react';

import { FaCartPlus, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPinterest } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { jwtDecode } from 'jwt-decode';

// import RelatedProduct from './RelatedProduct'; // Ensure this component exists

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
      setQuantity(prevQuantity => prevQuantity + 1);
    };
    const decreaseQuantity = () => {
      setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };
    
    const handleAddToCart = async ()=>{
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        

        const url = `${process.env.REACT_APP_URL}/addtocart`;
        const response = await axios.post(url,{
          productId : id,
          quantity : quantity,
          userId : userId
        })
      } catch (error) {
        console.error('error occured in atc :',error)
      }
    }
    const handleProductDetails = async () => {
        try {
          
          const url = `${process.env.REACT_APP_URL}/productdetail/${id}`;
          const response = await axios.get(url);
          const item = response?.data;
          setProduct(item); 
          
        } catch (error) {
          console.log('Error occurred during object fetch:', error);
          
        }
      };
      useEffect(() => {
        handleProductDetails();
      }, [id]);
  return (
    <div className="container mx-auto px-4 py-6 pt-[15vh]  lg:h-[80vh] h-[150vh] md:h-[80vh] sm:h-[90vh]">
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="w-full h-[20%] md:w-[50%] lg:h-full">
        <Image
        cloudName="dloe8x9e4"
        publicId={product?.img}
        className="object-contain w-full h-full"
        
        />
          
        </div>
        <div className="w-full md:w-1/2 h-[40%] justify-center gap-2 flex flex-col md:justify-center md:gap-1 lg:justify-between md:h-[70%] lg:h-full">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>
            <p className="text-xl font-semibold mb-4">10</p>
            <p className="mb-4">{product?.description}</p>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={decreaseQuantity} 
                className="px-4 py-2 text-xl"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button 
                  onClick={increaseQuantity}
                className="px-4 py-2 text-xl"
              >
                +
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
            >
              <FaCartPlus size={20} />
              ADD TO CART
            </button>
          </div>

          <div className="border-t border-gray-300 pt-4 mt-4">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <span className="font-bold">Category: 
                <span className="font-normal ml-1">{product?.category}</span>
              </span>
              <span className="font-bold">Share:
                <div className="flex gap-2 mt-1">
                  <FaFacebookF size={16} className="cursor-pointer" />
                  <FaTwitter size={16} className="cursor-pointer" />
                  <FaInstagram size={16} className="cursor-pointer" />
                  <FaLinkedinIn size={16} className="cursor-pointer" />
                  <FaPinterest size={16} className="cursor-pointer" />
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <RelatedProduct productId={id} categoryId={product?.categories?.data[0]?.id} /> */}
    </div>
  );
};

export default ProductDetail;
