import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ uniform }) => {
  const navigate = useNavigate();

  if (!uniform) {
    return null; // Return nothing if uniform is undefined
  }

  // Function to navigate and pass the uniform object to ProductDetails page
  const handlepassobj = () => {
    // Passing uniform as state while navigating
    navigate(`/product/${uniform.id}`, { state: { uniform } });
  };

  return (
    <div onClick={handlepassobj} className="institutionCard w-[20rem] m-3 transition-all cursor-pointer">
      <div className="productCard">
        <div>
          {/* Uniform Image - Only render if image exists */}
          {uniform.image ? (
            <img
              src={uniform.image}
              alt={`${uniform.type} Image`}
              className="w-[18rem] h-[18rem] object-cover object-left-top"
            />
          ) : (
            <div className="w-[18rem] h-[18rem] bg-gray-200 flex items-center justify-center text-gray-500">Image not available</div>
          )}
        </div>
        <div className="textpart bg-white p-3">
          {/* Uniform Description */}
          <p>{uniform.description}</p>

          {/* Institution Type */}
          <p className="text-gray-600 mb-2">Type: {uniform.institution?.institutionType || 'N/A'}</p>

          {/* Price */}
          <p className="font-semibold text-green-600">Rs. {uniform.price}</p>

          {/* Available Sizes */}
          <p>Sizes: {uniform.sizes.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
