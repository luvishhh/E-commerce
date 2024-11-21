import React from 'react';
import { IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Button from '@mui/material/Button';

const Cartitem = ({ item, onIncrement, onDecrement, onRemove }) => {
  const { id, name, price, quantity, image, description, highlights } = item; 






  return (
    <div className="p-5 shadow-lg border rounded-md mb-4">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            src={image}  // Use dynamic image passed from the product
            alt={name}
            className="object-cover object-top w-full h-full"
          />
        </div>

        <div className="ml-5 space-y-1">
          <h3 className="text-sm font-medium">{name}</h3>
          <p className="text-xs">{description}</p>
          <p className="text-xs text-gray-500">Price: ${(price * quantity).toFixed(2)}</p>
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton onClick={onDecrement} sx={{ color: "RGB(145 85 253)" }}>
            <RemoveCircleOutlineIcon />
          </IconButton>

          <span className="py-1 px-7 border rounded-sm">{quantity}</span>

          <IconButton onClick={onIncrement} sx={{ color: "RGB(145 85 253)" }}>
            <ControlPointIcon />
          </IconButton>
        </div>

        <div>
          <Button
            variant="text"
            sx={{ color: "RGB(145 85 253)" }}
            onClick={onRemove}
            
          >
            Remove
          </Button>
        </div>
      </div>

      {/* Highlights List */}

      <div className="mt-3">
        <p className="text-xs font-semibold">Highlights:</p>
        <ul className="list-disc pl-5 text-xs">
          {(highlights || ["NA"]).map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cartitem;
