import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    isPurchasing: false
  };
  
  componentDidMount() {
    this.props.onInitIngredients();
  }
  
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0
    }
    
    let orderSummary = null;
    
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={ this.props.ings }/>
          <BuildControls
            price={ this.props.price }
            ingredientAdded={ this.props.onIngredientAdded }
            ingredientRemoved={ this.props.onIngredientRemoved }
            disabled={ disabledInfo }
            purchaseable={ this.checkIsPurchaseable(this.props.ings)}
            ordered={ this.purchaseHandler }
          />
        </Aux>
      );
      orderSummary = (<OrderSummary
        purchaseCanceled={ this.purchaseCancelHandler }
        purchaseContinued={ this.purchaseContinueHandler }
        ingredients={ this.props.ings }
        price={ this.props.price }/>);
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
    return sum > 0;
  };
  
  purchaseHandler = () => {
    this.setState({ isPurchasing: true })
  };
  
  purchaseCancelHandler = () => {
    this.setState({ isPurchasing: false })
  };
  
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: name => dispatch(burgerBuilderActions.addIngredient(name)),
    onIngredientRemoved: name => dispatch(burgerBuilderActions.removeIngredient(name)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));