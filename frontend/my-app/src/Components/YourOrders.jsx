import React from 'react'
import ProductItem from './ProductItem';

const YourOrders = () => {
    const products = [
        { id: 1, title: 'Product Title', description: 'Product Description', price: 20.00, quantity: 1 },
        { id: 2, title: 'Product Title', description: 'Product Description', price: 15.00, quantity: 1 },
        // { id: 3, title: 'Product Title', description: 'Product Description', price: 20.00, quantity: 1 },
        // { id: 4, title: 'Product Title', description: 'Product Description', price: 15.00, quantity: 1 },
        // { id: 5, title: 'Product Title', description: 'Product Description', price: 20.00, quantity: 1 },
        // { id: 6, title: 'Product Title', description: 'Product Description', price: 15.00, quantity: 1 },
        // { id: 7, title: 'Product Title', description: 'Product Description', price: 20.00, quantity: 1 },
        // { id: 8, title: 'Product Title', description: 'Product Description', price: 15.00, quantity: 1 },
        // { id: 9, title: 'Product Title', description: 'Product Description', price: 20.00, quantity: 1 },
        // { id: 10, title: 'Product Title', description: 'Product Description', price: 15.00, quantity: 1 }
      ];
    
   
    
  return (
    <div>
      <div className="container mx-auto px-4 pt-[10vh] py-8 min-h-[80vh]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold my-4">Your Orders</h1>
        
      </div>

      <div className="mt-8">
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

      
    </div>
    </div>
  )
}

export default YourOrders
