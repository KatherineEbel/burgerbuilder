import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'cheapest',
        validation: {},
        valid: true
      }
    },
    isValid: false
  };
  
  checkIsValid(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid;
    }
    return isValid;
  }
  
  inputChangedHandler = (inputIdentifier, event) => {
    const orderForm = {...this.state.orderForm};
    const elConfigCopy = {...orderForm[inputIdentifier]};
    elConfigCopy.value = event.target.value;
    elConfigCopy.valid = this.checkIsValid(elConfigCopy.value, elConfigCopy.validation);
    elConfigCopy.touched = true;
    orderForm[inputIdentifier] = elConfigCopy;
    const isValid = Object.keys(orderForm).reduce((isValid, key) => {
      isValid = orderForm[key].valid && isValid;
      return isValid;
    }, true);
    this.setState({orderForm, isValid})
  };
  
  render() {
    const formElArray = Object.keys(this.state.orderForm)
      .reduce((result, key) => {
        result.push({
          id: key,
          config: this.state.orderForm[key]
        });
        return result;
      },[]);
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElArray.map(el => (
          <Input
            changed={this.inputChangedHandler.bind(this, el.id)}
            key={el.id} value={el.config.value}
            invalid={!el.config.valid}
            shouldValidate={el.config.validation}
            touched={el.config.touched}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig} />
        ))}
        <div className="actions">
          <Button
            disabled={ !this.state.isValid }
            clicked={ this.orderHandler }
            btnType="Success">ORDER</Button>
        </div>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner/>
    }
    return (
      <div className={ classes.ContactData }>
        <h4>Enter your Contact Data</h4>
        { form }
      </div>
    );
  }
  
  orderHandler = (e) => {
    e.preventDefault();
    const { ings, price } = this.props;
    const formData = Object.keys(this.state.orderForm)
                           .reduce((data, identifier) => {
                             data[identifier] = this.state.orderForm[identifier].value;
                             return data;
                           },{});
    
    const order = {
      ingredients: ings,
      price: +price,
      orderData: formData,
      userId: this.props.userId
    };
    this.props.onOrderBurger(order, this.props.token);
  };
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
