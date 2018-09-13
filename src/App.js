import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/asyncComponent';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import * as actions from './store/actions';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount() {
    this.props.tryAutoSignup();
  }
  
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={ asyncAuth }/>
        <Route path="/" exact component={ BurgerBuilder }/>
        <Redirect to="/"/>
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={ asyncCheckout }/>
          <Route path="/orders" component={ asyncOrders }/>
          <Route path="/auth" component={ asyncAuth }/>
          <Route path="/logout" exact component={ Logout }/>
          <Route path="/" exact component={ BurgerBuilder }/>
          <Redirect to="/"/>
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  tryAutoSignup: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
