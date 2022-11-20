import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSnai3y } from "../../../Redux/Slices/Snai3yReducer";
const PaypalCheckoutButton = (props) => {
    const { product } = props;
    var token=localStorage.getItem("token");
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const dispatch =useDispatch();
    let headers={
        'Authorization': token
    }

    const handleApprove = (orderId) => {
       
        axios.put('http://localhost:7000/sanai3y/update',{},{headers:headers}).then((res)=>
        {
            dispatch(getSnai3y())
        })
    
        // if response is success
        setPaidFor(true);
        // Refresh user's account or subscription status
    
        // if response is error

        // setError("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
      };


      if (paidFor) {
        // Display success message, modal or redirect user to success page
       // alert("Thank you for your purchase!");

      }

      if (error) {
        // Display error message, modal or redirect user to error page
        // alert(error);
      }

      return (
        <PayPalButtons
        style={{
            // color: "silver",
            layout: 'horizontal',
            height: 40,
            tagline: false,
            shape: "pill",
            
          }}
          onClick={(data, actions) => {
            // Validate on button click, client or server side
            const hasAlreadyBoughtCourse = false;
          
            if (hasAlreadyBoughtCourse) {
              setError(
                "You already bought this course. Go to your account to view your list of courses."
              );
          
              return actions.reject();
            } else {
              return actions.resolve();
            }
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: product.description,
                  amount: {
                    value: product.price,
                    // currency_code: 'EGP',
                  }
                }
              ]
            });
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order.capture(); 
            console.log("order", order);
          
            handleApprove(data.orderID);
          }}
          onCancel={() => {
            // Display cancel message, modal or redirect user to cancel page or back to cart
          }}
          onError={(err) => {
            setError(err);
            console.error("PayPal Checkout onError", err);
          }}
        />
      );
  };
  
  export default PaypalCheckoutButton;