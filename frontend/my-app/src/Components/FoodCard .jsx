import React from 'react';
import { Image } from 'cloudinary-react';
const FoodCard = ({ name, price, img, description }) => {
  return (
    <div className="w-full max-w-xs shadow-2xl sm:max-w-sm lg:max-w-md p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          <div className="overflow-hidden h-48 rounded-lg">
           <Image 
             cloudName="dloe8x9e4"
             publicId={img}
            className="object-contain"
           style={{height:"100%" , width : "100%"}}
           />
          </div>
        </div>
        <div className="p-6">
          <h5 className="text-xl font-semibold mb-2">{name}</h5>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <h6 className="text-xl font-semibold">${price}</h6>
            <a href="#" className="text-yellow-400 hover:text-yellow-500 transition-colors">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 456.029 456.029"
                style={{ enableBackground: 'new 0 0 456.029 456.029' }}
                xmlSpace="preserve"
                className="w-6 h-6"
              >
                <g>
                  <path
                    d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                     c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
                  />
                  <path
                    d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                     C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                     c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                     C457.728,97.71,450.56,86.958,439.296,84.91z"
                  />
                  <path
                    d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                     c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
                  />
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
