import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'password',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
    },
    isSignUp: true
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
    
    if (rules.isEmail) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value) && isValid;
    }
    
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }
  
  inputChangedHandler = (controlName, event) => {
    const controls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkIsValid(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({controls});
  };
  
  submitHandler = event => {
    const { controls } = this.state;
    event.preventDefault();
    this.props.onAuth(controls.email.value, controls.password.value, this.state.isSignUp);
  };
  
  switchAuthModeHandler = () => {
    this.setState(prevState => ({isSignUp: !prevState.isSignUp}));
  };
  
  render() {
    const formElArray = Object.keys(this.state.controls)
                              .reduce((result, key) => {
                                result.push({
                                  id: key,
                                  config: this.state.controls[key]
                                });
                                return result;
                              },[]);
    
    const form = formElArray.map(el =>  (
        <Input
          key={el.id}
          changed={this.inputChangedHandler.bind(this, el.id)}
          invalid={!el.config.valid}
          shouldValidate={el.config.validation}
          touched={el.config.touched}
          elementType={el.config.elementType}
          elementConfig={el.config.elementConfig} />
    ));
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
          <Button
            clicked={this.switchAuthModeHandler}
            btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN': 'SIGNUP'}?</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
});

export default connect(null, mapDispatchToProps)(Auth);