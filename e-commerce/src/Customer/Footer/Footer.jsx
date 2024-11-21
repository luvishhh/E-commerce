import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => {
  return (
    <div>
      <Grid
        className="bg-black text-white text-center mt-10"
        container
        sx={{ bgcolor: 'black', color: 'white', py: 3 }}
      >
        <Grid item xs={12} sm={6} md={7}>
          <Typography className="pb-5" variant="h6">
            Company
          </Typography>
          <div>
            <Link to="/" className="pb-5 text-white no-underline">
              About
            </Link>
          </div>
          <div>
            <Link to="/product" className="pb-5 text-white no-underline">
              Product
            </Link>
          </div>
          <div>
            <Link to="/charity" className="pb-5 text-white no-underline">
              Charity
            </Link>
          </div>
          <div>
            <Link to="/contact" className="pb-5 text-white no-underline">
              Contact Us
            </Link>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            Legal
          </Typography>
          <div>
            <Link to="/privacy" className="pb-5 text-white no-underline">
              Privacy
            </Link>
          </div>
          <div>
            <Link to="/claim" className="pb-5 text-white no-underline">
              Claim
            </Link>
          </div>
          <div>
            <Link to="/terms" className="pb-5 text-white no-underline">
              Terms
            </Link>
          </div>
          <div>
            <Link to="/copyright" className="pb-5 text-white no-underline">
              Copyright
            </Link>
          </div>
        </Grid>

        <Grid className="pt-20" item xs={12}>
          <Typography variant="body2" component="p" align="center">
            &copy; 2024 My Company. All Rights Reserved.
          </Typography>
          <Typography variant="body2" component="p" align="center">
            Made by Lavish
          </Typography>
          <Typography variant="body2" component="p" align="center">
            Icons made by Freepik
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
