import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import DeliveryAddressForm from "./DeliveryAddressForm";
import OrderSummary from "./OrderSummary";
import Payment from "../Payment/Payment";

const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

export default function Checkout() {
  const location = useLocation();
  const [PaymentData, setPaymentData] = React.useState();
  const querysearch = new URLSearchParams(location.search);

  // Start from Step 1 (Delivery Address) by default
  const defaultStep = querysearch.get("step") ? parseInt(querysearch.get("step"), 10) : 1;
  const [activeStep, setActiveStep] = React.useState(defaultStep);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="px-10 lg:px-20 mt-20">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={index < activeStep}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you're finished</Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              {activeStep < steps.length - 1 && (
                <Button onClick={handleNext} sx={{ ml: 1 }}>
                  Next
                </Button>
              )}
            </Box>

            <div className="mt-10">
              {activeStep === 1 && <DeliveryAddressForm setStep={setActiveStep} />}
              {activeStep === 2 && <OrderSummary setStep={setActiveStep} setPaymentData={setPaymentData} />}
              {activeStep === 3 && <Payment data={PaymentData}/>}
            </div>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
