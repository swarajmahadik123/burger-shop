import React from 'react';

const FoodNav = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ['All', 'Burger', 'Pizza', 'Pasta', 'Fries'];

  return (
    <div className="food_section">
      <ul className="flex flex-wrap justify-center list-none p-0 m-4 space-x-2">
        {categories.map(category => (
          <li 
            key={category} 
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full cursor-pointer text-center ${
              selectedCategory === category 
                ? 'bg-[#222831] text-white' 
                : 'bg-gray-200 hover:bg-[#222831] hover:text-white'
            }`}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodNav;
