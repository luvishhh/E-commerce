import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeSectionCard = ({ product }) => {
  const navigate = useNavigate(); 
  const handleclickbuy = () => {
    navigate('/product');
  };

  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 mt-4">
      <div className="h-[13rem] w-[10rem]">
        <img src={product.image} alt={product.description} className="object-cover object-top w-48 h-48 p-3 rounded-lg" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-wrap">{product.description}</h3>
        <p className="mt-2 text-sm text-gray-500">{product.color}</p>
        <span className="text-gray-500">Rs. {product.price}</span>
        <button
          className="mt-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md p-2 mx-3"
          onClick={handleclickbuy} // Set onClick to the function itself
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default HomeSectionCard;
