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

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
};

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post(`/orders.json?auth=${token}`, orderData)
         .then(res => {
           dispatch(purchaseBurgerSuccess(res.data, orderData));
         })
         .catch(e => dispatch(purchaseBurgerFail(e)))
  }
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  }
};

export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get(`/orders.json?auth=${token}`)
         .then(res => {
           const orders = Object.keys(res.data).reduce((orders, key) => {
             orders.push({
               ...res.data[key],
               id: key
             });
             return orders;
           },[]);
           dispatch(fetchOrdersSuccess(orders))
         })
         .catch(e => dispatch(fetchOrdersFail(e)))
  }
};

const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  }
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
};
