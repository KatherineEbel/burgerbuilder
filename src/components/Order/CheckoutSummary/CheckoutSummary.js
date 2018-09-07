import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = props => {
  return (
    <div className={ classes.CheckoutSummary }>
      <h2>We hope it's delicious!</h2>
      <Burger style={{width: '100%',  margin: 'auto'}} ingredients={ props.ingredients }/>
      <div className={ classes.Actions }>
        <Button
          clicked={ props.checkoutCancelled }
          btnType="Danger">CANCEL</Button>
        <Button
          clicked={ props.checkoutContinued }
          btnType="Success">CONTINUE</Button>
      </div>
    </div>
  );
};

export default checkoutSummary;