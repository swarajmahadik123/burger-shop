import React, { useEffect, useState } from 'react';
import FoodNav from './FoodNav';
import FoodCard from './FoodCard ';
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';


const FoodSection = () => {
  const [foodItems,setFoodItems]=useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
   const handleProductReq = async ()=>{
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/product`);
       
        setFoodItems(response?.data)
      
      } catch (error) {
        console.error('error occured');
      }
   }
   useEffect(()=>{
      handleProductReq();
   },[])
//    const handleProductDetails = async (id)=>{
//     try {
//         const url = `http://localhost:8080/productdetail/{id}`;
//         const response = await axios.get(url);
//         console.log(response.data);
//     } catch (error) {
        
//     }
// }
  // Filter the food items based on the selected category
  const filteredItems = selectedCategory === 'All' 
    ? foodItems 
    : foodItems.filter(item => item.category === selectedCategory);

  return (
    <div className="flex flex-col pt-12 items-center w-full min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full max-w-6xl px-4 py-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 dancing-script text-center">
          Our Offer
        </h1>
        <FoodNav selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {filteredItems.map(item => (
            <FoodCard  key={item?._id} _id={item?._id} name={item.name} price={item.price} img={item.img} description={item.description} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodSection;
