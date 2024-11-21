import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeliveryAddressForm = ({ setStep }) => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState([]); // State to store all addresses

  // Fetch the saved addresses when the component mounts
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/Checkout/address");
        setAddress(response.data); // Set the addresses state with fetched data
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  // Handle form submission to save a new address
  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const addressData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      contactNumber: data.get("contactNumber"),
      address1: data.get("addressLine1"),
      address2: data.get("addressLine2"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zipCode"),
      country: data.get("country"),
      institutionName: data.get("institutionName"),
      notes: data.get("notes") || "",
    };

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3002/api/Checkout/submit", addressData);
      toast.success("Address saved successfully!");
      setAddress([response.data, ...address]); // Add the new address to the state

      // Once the address is saved, move to the next step (Order Summary)
      setStep(2); // Set activeStep to 2 (Order Summary)

    } catch (error) {
      toast.error("Failed to save the address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Grid container spacing={2} className="mx-auto" justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
        {/* Delivery Address Form */}
        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shadow-md p-5">
            <Typography variant="h6" gutterBottom>
              Delivery Address
            </Typography>
            <form onSubmit={handlesubmit}>
              <Grid container spacing={3}>
                {/* First Name Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    defaultValue={address ? address.firstName : ""}
                  />
                </Grid>

                {/* Last Name Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name"
                    defaultValue={address ? address.lastName : ""}
                  />
                </Grid>

                {/* Email Field */}
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    type="email"
                    autoComplete="email"
                    defaultValue={address ? address.email : ""}
                  />
                </Grid>

                {/* Contact Number Field */}
                <Grid item xs={12}>
                  <TextField
                    required
                    id="contactNumber"
                    name="contactNumber"
                    label="Contact Number"
                    fullWidth
                    type="tel"
                    autoComplete="tel"
                    defaultValue={address ? address.contactNumber : ""}
                  />
                </Grid>

                {/* Address Line 1 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    id="addressLine1"
                    name="addressLine1"
                    label="Address Line 1"
                    fullWidth
                    defaultValue={address ? address.address1 : ""}
                  />
                </Grid>

                {/* Address Line 2 */}
                <Grid item xs={12}>
                  <TextField
                    id="addressLine2"
                    name="addressLine2"
                    label="Address Line 2"
                    fullWidth
                    defaultValue={address ? address.address2 : ""}
                  />
                </Grid>

                {/* City Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    defaultValue={address ? address.city : ""}
                  />
                </Grid>

                {/* State Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State"
                    fullWidth
                    defaultValue={address ? address.state : ""}
                  />
                </Grid>

                {/* Zip Code Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zipCode"
                    name="zipCode"
                    label="Zip Code"
                    fullWidth
                    defaultValue={address ? address.zipCode : ""}
                  />
                </Grid>

                {/* Country Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    defaultValue={address ? address.country : ""}
                  />
                </Grid>

                {/* Institution Name */}
                <Grid item xs={12}>
                  <TextField
                    id="institutionName"
                    name="institutionName"
                    label="Institution Name (Optional)"
                    fullWidth
                    defaultValue={address ? address.institutionName : ""}
                  />
                </Grid>

                {/* Notes Field */}
                <Grid item xs={12}>
                  <TextField
                    id="notes"
                    name="notes"
                    label="Additional Notes"
                    fullWidth
                    multiline
                    rows={4}
                    defaultValue={address ? address.notes : ""}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
                    size="large"
                    variant="contained"
                    type="submit"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save & Continue"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default DeliveryAddressForm;
