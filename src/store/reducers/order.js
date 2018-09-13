import * as actionTypes from '../actions/actionTypes';
import { update } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = update(action.orderData, { id: action.orderId});
  return update(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const fetchOrdersSuccess = (state, action) => {
  return update(state, { orders: action.orders,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return update(state, { purchased: false });
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL: return update(state, { loading: false});
    case actionTypes.PURCHASE_BURGER_START: return update(state, { loading: true });
    case actionTypes.FETCH_ORDERS_START: return update(state, { loading: true });
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: return update(state, { loading: false });
    default: return state;
  }
};

export default reducer;