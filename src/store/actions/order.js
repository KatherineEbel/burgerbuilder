import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData
  }
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  }
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
};

const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurger());
    axios.post('/orders.json', orderData)
         .then(res => {
           console.log(res.data);
           dispatch(purchaseBurgerSuccess(res.data, orderData));
         })
         .catch(e => dispatch(purchaseBurgerFail(e)))
         .finally(() => {
           this.props.history.push('/');
         });
  }
};
