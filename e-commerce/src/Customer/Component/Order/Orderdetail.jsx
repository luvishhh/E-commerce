import React from 'react'
// import AddressCard from '../AddressCard/AddressCard'
import Ordertracker from './Ordertracker'
import { Box, Grid } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom'

const Orderdetail = () => {
  const navigate= useNavigate();

  return (
    <div  className='lg:px-20 px:5 mt-9' >
        <div>
        <h1 className='font-bold text-xl py-7'>Delivery Address</h1>
    
        </div>


        <div className='py-20'>
            <Ordertracker activeStep={3}/>
        </div>

        <Grid container className='space-y-5  '>
        {[1,1,1,1,1].map(()=><Grid item container  className='shadow-xl rounded-md p-5 border' sx={{alignItems:"center", justifyContent:"space-between"}}>
              <Grid item xs={6} >
                <div className='flex item-center space-x-4'>
                  <img src="https://i.postimg.cc/8kXS6LNX/SRMU.png"  className=" w-[5rem] h-[5rem] object-cover object-top"   alt="" />

                  <div className='space-y-2  ml-5 '>
                    <p className='font-semibold'>Tshirt Very good </p>
                    <p className='space-x-5 opacity-50 text-xs font-semibold'><span> Color:pink </span><span>Size: M</span> </p>
                    <p>Seller: linaria</p>
                    <p>Rs. 3433</p>
                 </div>
                </div>
              </Grid>
            
            <Grid item>
              <Box sx={{color:deepPurple[500]}}>
                <StarBorderIcon sx={{fontSize:"2rem"}} className='px-2'/>
                <span>Rate & Reviews</span>
                
                </Box> 

            </Grid>
            </Grid>)}
        </Grid>
    </div>
  )
}

export default Orderdetail
