import React, { Fragment } from "react";
import "./CheckoutSteps.css";
import { StepLabel } from '@mui/material';
import { Step } from '@mui/material';
import { Stepper } from '@mui/material';
import FastfoodIcon from "@mui/icons-material/Fastfood"; // Correct icon import
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // Correct icon import
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"; // Correct icon import
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";




const CheckoutSteps = ({ activeStep }) => {
    const steps = [
      {
        label: <div>Shipping Details</div>,
        icon: <ShoppingCartIcon />,
      },
      {
        label: <div>Confirm Order</div>,
        icon: <LocalShippingIcon/>,
      },
      {
        label: <div>Payment</div>,
         icon: <MonetizationOnIcon/>,
      },
    ];
  
    const stepStyles = {
      boxSizing: "border-box",
    };
  
    return (
      <Fragment>
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
          {steps.map((item, index) => (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel
                style={{
                  color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                }}
                icon={item.icon}
              >
                {item.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Fragment>
    );
  };

  
  export default CheckoutSteps;