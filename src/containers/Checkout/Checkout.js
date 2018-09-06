import React, { Component } from 'react';
import CheckoutSummary from '../../components/Burger/OrderSummary/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.css';

class Checkout extends Component {
  state = {
    ingredients: {
      meat: 1,
      cheese: 1,
      tomato: 1,
      lettuce: 1
    }
  };
  
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = Array.from(query.entries()).reduce((ingredients, param) => {
      ingredients[param[0]] = +param[1];
      return ingredients;
    }, {});
    this.setState({ ingredients });
  }
  
  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  
  render () {
    const {ingredients} = this.state;
    return (
      <div className={ classes.Checkout }>
        <CheckoutSummary
          ingredients={ ingredients }
          checkoutCancelled={ this.checkoutCanceledHandler }
          checkoutContinued={ this.checkoutContinuedHandler }
        />
      </div>
    )
  }
}

export default Checkout;