import { Grid } from '@mui/material';
import React from 'react';
import AdjustIcon from '@mui/icons-material/Adjust';
import { Adjust } from '@mui/icons-material';

const OrderCard = () => {
  return (
    <div className='p-5 shadow-md shadow-black hover:shadow-2xl border '>
      <Grid container spacing={2} alignItems="center" sx={{ justifyContent: "space-between" }}>
        {/* Image and product details */}
        <Grid item xs={6}>
          <div className='flex items-center cursor-pointer mt-5'>
            <img 
              className='w-[8rem] h-[8rem] object-cover object-top mr-4' 
              src="https://m.media-amazon.com/images/I/51b9E7AdMPL._SX679_.jpg" 
              alt="" 
            />
            <div className='space-y-1'>
              <h3 className='text-sm font-semibold'>Polyester T-shirt</h3>
              <p className='opacity-50 text-xs font-semibold'>Color: Blue</p>
              <p className='opacity-50 text-xs font-semibold'>Size: M</p>
            </div>
          </div>
        </Grid>

        {/* Price section */}
        <Grid item xs={2}>
          <p className='text-lg text-green-600 font-semibold'>Rs. 1100</p>
        </Grid>

        {/* Delivery status */}
        <Grid item xs={4}>
          {true &&  <div>

            <div className='flex items-center text-sm'>
              <Adjust sx={{ width: "15px", height: "15px" }} className='text-green-700 mr-2' />
              <span>Delivered on March 03</span>
            </div>
            <p className='text-xs'>
                Your item has been delivered
            </p>
          </div>}
           
          {false &&  <div className='text-sm'>
              <span>Expected Delivery on March 03</span>
            </div>
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default OrderCard;
