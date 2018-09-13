import * as actionTypes from '../actions/actionTypes';
import { update } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  lettuce: 0.3,
  tomato: 0.4,
  onion: 0.25,
  cheese: 0.5,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
  const updatedIngredients = update(state.ingredients, updatedIngredient);
  return {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
  const updatedIngredients = update(state.ingredients, updatedIngredient);
  return {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
};

const setIngredients = (state, action) => {
  return update(state, {
    ingredients: {
      lettuce: action.ingredients.lettuce,
      onion: action.ingredients.onion,
      tomato: action.ingredients.tomato,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    building: false,
    price: 4
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return update(state, {error: true});
    default: return state;
  }
};

export default reducer;