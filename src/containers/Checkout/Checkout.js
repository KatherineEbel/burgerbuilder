import React from 'react';
import CheckoutSummary from '../../components/Burger/OrderSummary/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.css';

const checkout = () => {
  const ingredients = {
    meat: 1,
    cheese: 1,
    tomato: 1,
    lettuce: 1
  };
  return (
    <div className={ classes.Checkout }>
      <CheckoutSummary ingredients={ ingredients }/>
    </div>
  );
};

export default checkout;