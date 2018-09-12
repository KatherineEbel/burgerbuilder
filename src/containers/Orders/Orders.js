import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions';

class Orders extends Component {
  componentDidMount() {
    const { token } = this.props;
    this.props.onFetchOrders(token ? token : '');
  }
  render() {
    let orders = <Spinner/>;
    if (!this.props.loading) {
      orders =
        <div>
          { this.props.orders.map(o => (
            <Order
              key={ o.id }
              ingredients={ o.ingredients }
              price={ o.price }
            />))}
        </div>;
    }
    return orders;
    
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));