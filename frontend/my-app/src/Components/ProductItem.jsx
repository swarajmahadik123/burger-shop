import React from 'react'

const ProductItem = ({ product }) => (
  <div className="flex sm:flex-col md:flex-row border-b border-gray-400 py-4">
    <div className='flex flex-col md:flex-row border-b border-gray-400 py-4 w-[60%]'>
      <div className="flex-shrink-0">
        <img src="https://picsum.photos/id/237/150/150" alt="Product image" className="w-32 h-32 object-cover" />
      </div>
      <div className="mt-4 md:mt-0 md:ml-6">
        <h2 className="text-lg font-bold">{product.title}</h2>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <div className="mt-4 flex items-center">
          <span className="mr-2 text-gray-600">Quantity:</span>
          <div className="flex items-center">
            <button className="bg-gray-200 rounded-l-lg px-2 py-1" disabled>-</button>
            <span className="mx-2 text-gray-600">{product.quantity}</span>
            <button className="bg-gray-200 rounded-r-lg px-2 py-1" disabled>+</button>
          </div>
          <span className="ml-auto font-bold">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
    <div className='flex items-end justify-end md:flex-row border-b border-gray-400 py-4 w-[60%]'>
      <button className="bg-red-500 hover:bg-red-100 hover:border-red-500 text-white hover:text-red-500 font-bold py-2 px-4 rounded border border-transparent transition-colors duration-200">
        Cancel Order
      </button>
    </div>
  </div>
);

export default ProductItem;
