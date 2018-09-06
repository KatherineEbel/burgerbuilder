import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

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
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    isPurchasing: false,
    isLoading: false,
    error: false
  };
  
  componentDidMount() {
    axios.get('/ingredients.json')
      .then(res => this.setState({ ingredients: res.data }))
      .catch(() => this.setState({ error: true }))
  }
  
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0
    }
    
    let orderSummary = null;
    
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = (<OrderSummary
        purchaseCanceled={ this.purchaseCancelHandler }
        purchaseContinued={ this.purchaseContinueHandler }
        ingredients={ this.state.ingredients }
        price={ this.state.totalPrice }/>);
    }
  
    if (this.state.isLoading) {
      orderSummary = <Spinner/>;
    }
    
    return (
      <Aux>
        <Modal
          modalClosed={ this.purchaseCancelHandler }
          show={ this.state.isPurchasing }>
          { orderSummary }
        </Modal>
        { burger }
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
    this.setState({ isLoading: true });
    const { ingredients, totalPrice } = this.state;
    const order = {
      ingredients,
      totalPrice,
      customer: {
        name: 'Katherine Ebel',
        address: {
          street: '123 Some Street',
          zipCode: 90210,
          country: 'USA'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order)
      .then(res => {
        console.log(res);
      })
      .catch(e => console.log(e))
      .finally(() => this.setState({ loading: false, isPurchasing: false }));
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

export default withErrorHandler(BurgerBuilder, axios);