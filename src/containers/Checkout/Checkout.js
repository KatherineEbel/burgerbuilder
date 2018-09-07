import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.css';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };
  
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    let price = 0;
    const ingredients = Array.from(query.entries()).reduce((ingredients, param) => {
      if (param[0] === 'price') {
        price = param[1];
        return ingredients;
      }
      ingredients[param[0]] = +param[1];
      return ingredients;
    }, {});
    this.setState({ ingredients, price });
  }
  
  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  
  render () {
    const {ingredients, price } = this.state;
    return (
      <div className={ classes.Checkout }>
        <CheckoutSummary
          ingredients={ ingredients }
          checkoutCancelled={ this.checkoutCanceledHandler }
          checkoutContinued={ this.checkoutContinuedHandler }
        />
        <Route path={ `${this.props.match.path}/contact-data` }
               render={(props) => (
                 <ContactData
                   {...props}
                   ingredients={ ingredients } price={ price }/>) }
        />
      </div>
    )
  }
}

export default Checkout;