import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const PaymentTest = () => {
    const [product, setProduct] = useState({
        name: "laptop",
        price: 650,
    });
    
    const handleSuccess = () => {
        MySwal.fire({
            icon: 'success',
            title: 'Payment was successful',
            time: 4000,
        });
      };
      const handleFailure = () => {
        MySwal.fire({
          icon: 'error',
          title: 'Payment was not successful',
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
              amount: product.price * 100,
              token,
              userId: '65aea0b4bb25ed77f1e15818',
              companyId: '65ae8f2f7d1fcfcf5aca4c63',      
            },
          });
          if (response.status === 200) {
            const response2 = await axios({
              url: 'http://localhost:4000/package/bookPackage',
              method: 'post',
              data: {
                companyId: '65ae8f2f7d1fcfcf5aca4c63',
                packageId: '65ae911f43fbd7df448ba8d9',
                userId: '65aea0b4bb25ed77f1e15818', 
                nbPeople:2,
                paidAmount: product.price * 100, 
              },
            });
            console.log(response2);
            if(response2.status === 200){
              handleSuccess();
            }
          }
        } catch (error) {
          handleFailure();
          console.log(error);
        }
      };
    
      return (
        <div className="PaymentTest">
          <div className="container">
            <p>
              <span>Product:</span> {product.name}
            </p>
            <p>
              <span>Price:</span> {product.price}
            </p>
            <StripeCheckout 
            stripeKey="pk_test_51ObTfZDOmCem7mO8ZLZ1nlH68j7MV37PA1lrTbOmzWlwQSQ8jFeSZNWt8rNqa6XRH52mKiLGpS1qwwCLogRWw4Hc00xjNCylTy"
            label = "Pay Now"
            name = "Pay with Credit Card"
            billingAddress
            shippingAddress
            amount = {product.price}
            description = {`Your total is $${product.price}`}
            token = {payNow} />
          </div>
        </div>
      );
}

export default PaymentTest;