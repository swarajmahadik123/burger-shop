import React from 'react';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';

const FoodCard = ({ name, price, img, description, _id }) => {
  return (
    <div className="w-full max-w-xs shadow-2xl sm:max-w-sm lg:max-w-md p-4">
      <Link to={`/productdetail/${_id}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            <div className="overflow-hidden h-48 rounded-lg">
              <Image
                cloudName="dloe8x9e4"
                publicId={img}
                className="object-contain"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          </div>
          <div className="p-6">
            <h5 className="text-xl font-semibold mb-2">{name}</h5>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex items-center justify-between">
              <h6 className="text-xl font-semibold">${price}</h6>
             
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FoodCard;
