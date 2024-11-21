import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetails = () => {
  const { state } = useLocation(); // Access state passed from ProductCard
  const { uniform } = state || {}; // Destructure the uniform object

  if (!uniform) {
    return <div className="flex justify-center items-center h-screen text-2xl">Loading...</div>;
  }

  // Handle add to cart functionality
   const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemExists = cart.find(item => item.id === uniform.id);

    if (!itemExists) {
      const updatedCart = [...cart, { ...uniform, quantity: 1 }];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image and Gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-full max-h-[35rem]">
              <img
                src={uniform.image}
                alt={uniform.name}
                className="w-full h-full object-cover object-center shadow-lg"
              />
            </div>
            <div className="mt-4 flex space-x-4">
              {uniform.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`product-${index}`}
                  className="w-24 h-24 object-cover rounded-md cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold text-gray-900">{uniform.name}</h1>
            <p className="text-lg text-gray-700">{uniform.description}</p>

            {/* Price */}
            <p className="text-2xl font-bold text-green-600">₹{uniform.price}</p>

            {/* Size Selection */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Available Sizes</h2>
              <div className="flex space-x-4 mt-2">
                {uniform.sizes.map((size) => (
                  <button
                    key={size}
                    className="px-6 py-3 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Highlight Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900">Highlights</h3>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                {uniform.highlights?.map((highlight, index) => (
                  <li key={index} className="text-gray-700">{highlight}</li>
                ))}
              </ul>
            </div>

            {/* Product Details Section */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-gray-600">Color: {uniform.color}</p>
                  <p className="text-gray-600">Fabric: {uniform.fabric || 'Cotton'}</p>
                  <p className="text-gray-600">Ideal for: {uniform.idealFor || 'Boys and Girls'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">Brand: {uniform.brand || 'Generic'}</p>
                  <p className="text-gray-600">Care Instructions: {uniform.careInstructions || 'Machine wash'}</p>
                  <p className="text-gray-600">Warranty: {uniform.warranty || '1 year'}</p>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-8">
              <button
                type="button"
                className="w-full py-3 px-6 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
