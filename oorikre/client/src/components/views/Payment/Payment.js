import React, { useEffect, useState } from 'react';
import StripeCheckout from "react-stripe-checkout";
import "../../App.css";
import logo from "../../cofee.png"

function Payment() {
    const [product, setProduct] = useState({
      name: "Donate",
      price: 10,
      productBy: "EAD Course"
    });
  
    const makePayment = token => {
      const body = {
        token,
        product
      };
      const headers = {
        "Content-Type": "application/json"
      };
  
      return fetch(`http://localhost:5000/payment`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
      })
        .then(response => {
          console.log("RESPONSE ", response);
          const { status } = response;
          console.log("STATUS ", status);
        })
        .catch(error => console.log(error));
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" height="400px"/>
  
          <h1>Liked What we Developed</h1>
          <StripeCheckout
            stripeKey="pk_test_51IdZshSEn9zf5ZOY4xTqToNFSUcMul9j3c7n4XhNicVGdS1wPks2KuCpYzbhh9r5maJld8GNiuUVJKC1UcxPDLpj00naeIA1fL"
            token={makePayment}
            name="Donation"
            amount={product.price * 100}
          >
            <button className="button">
              Buy Us a Cup of Cofee {product.price} $
            </button>
          </StripeCheckout>
        </header>
      </div>
    );
  }
  
  export default Payment;
  