import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.css';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  
  render () {
    const {ings } = this.props;
    let summary = <Redirect to="/"/>;
    if (ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
      summary =
        <div className={ classes.Checkout }>
          { purchasedRedirect }
          <CheckoutSummary
            ingredients={ ings }
            checkoutCancelled={ this.checkoutCanceledHandler }
            checkoutContinued={ this.checkoutContinuedHandler }
          />
          <Route path={ `${this.props.match.path}/contact-data` }
                 component={ ContactData }
          />
        </div>
    }
    return summary;
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  purchased: state.order.purchased
});


export default connect(mapStateToProps)(Checkout);