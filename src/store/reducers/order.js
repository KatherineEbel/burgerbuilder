import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  isPurchasing: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      
      return {
        ...state,
        isPurchasing: false,
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        isPurchasing: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        isPurchasing: true
      };
    default:
      return state;
  }
};

export default reducer;