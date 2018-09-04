import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  lettuce: 0.3,
  tomato: 0.4,
  onion: 0.25,
  cheese: 0.5,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
      onion: 0,
      tomato: 0
    },
    totalPrice: 4,
    purchaseable: false,
    isPurchasing: false
  };
  
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0
    }
    return (
      <Aux>
        <Modal
          modalClosed={ this.purchaseCancelHandler }
          show={ this.state.isPurchasing }>
          <OrderSummary
            purchaseCanceled={ this.purchaseCancelHandler }
            purchaseContinued={ this.purchaseContinueHandler }
            ingredients={ this.state.ingredients }
            price={ this.state.totalPrice }
          />
        </Modal>
        <Burger ingredients={ this.state.ingredients }/>
        <BuildControls
          price={ this.state.totalPrice }
          ingredientAdded={ this.addIngredientHandler }
          ingredientRemoved={ this.removeIngredientHandler }
          disabled={ disabledInfo }
          purchaseable={ this.state.purchaseable }
          ordered={ this.purchaseHandler }
        />
      </Aux>
    );
  }
  
  checkIsPurchaseable = (ingredients) => {
    const sum = Object.keys(ingredients)
                      .reduce((sum, key) => sum + ingredients[key], 0);
    this.setState({ purchaseable: sum > 0 })
  };
  
  purchaseHandler = () => {
    this.setState({ isPurchasing: true })
  };
  
  purchaseCancelHandler = () => {
    this.setState({ isPurchasing: false })
  };
  
  purchaseContinueHandler = () => {
    alert('You continue');
  };
  
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    
    updateIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updateIngredients});
    this.checkIsPurchaseable(updateIngredients);
  };
  
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount === 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updateIngredients,
    });
    this.checkIsPurchaseable(updateIngredients)
  };
}

export default BurgerBuilder;