import React, { useState } from "react";
import {useAuthContext} from "../hooks/useAuthContext"
import {jwtDecode} from 'jwt-decode';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const PaymentTest = (props) => {
  
    const {user}=useAuthContext();
    const userId = jwtDecode(user.accessToken).user.id;
    
    
    const handleSuccess = () => {
        MySwal.fire({
            icon: 'success',
            title: 'Payment was successful',
            time: 4000,
        });
      };
      const handleFailure = (msg) => {
        MySwal.fire({
          icon: 'error',
          title: msg,
          time: 4000,
        });
      };
    
      const MySwal = withReactContent(Swal);
      
      const payNow = async token => {
        try {
            console.log(token);
          const response = await axios({
            url: 'http://localhost:4000/api/payment',
            method: 'post',
            data: {
              amount: props.price * props.nbPeople,
              token,
              userId: userId,
              companyId:props.companyId._id,      
            },
          });
          if (response.status === 200) {
            const response2 = await axios({
              url: 'http://localhost:4000/package/bookPackage',
              method: 'post',
              data: {
                companyId:props.companyId._id,
                packageId: props.packageId,
                userId: userId, 
                nbPeople:props.nbPeople,
                paidAmount: props.price * props.nbPeople, 
              },
            });
            console.log('response',response2.data);
            if(response2.status === 200){
              handleSuccess();
            }
            else 
            {
              const errorMessage = response2.data && response2.data.msg
          ? response2.data.msg
          : 'Unknown error';

        handleFailure(errorMessage);
            }
          }
        } catch (error) {
         
          const errorMessage = error.response && error.response.data && error.response.data.msg
          ? error.response.data.msg
          : 'Unknown error';
    
        handleFailure(errorMessage);
        console.log(error);
        }
      };
    
      return (
        <div className="PaymentTest">
          <div className="container">
          
            <StripeCheckout 
            stripeKey="pk_test_51ObTfZDOmCem7mO8ZLZ1nlH68j7MV37PA1lrTbOmzWlwQSQ8jFeSZNWt8rNqa6XRH52mKiLGpS1qwwCLogRWw4Hc00xjNCylTy"
            label = "Pay Now"
            name = "Pay with Credit Card"
            billingAddress
            shippingAddress
            amount = {props.price * props.nbPeople}
            description = {`Your total is $${props.price * props.nbPeople}`}
            token = {payNow} />
          </div>
        </div>
      );
}

export default PaymentTest;