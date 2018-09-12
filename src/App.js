import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './containers/Auth/Logout/Logout';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions';

class App extends Component {
  componentDidMount() {
    this.props.tryAutoSignup();
  }
  
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={ Auth }/>
        <Route path="/" exact component={ BurgerBuilder }/>
        <Redirect to="/"/>
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={ Checkout }/>
          <Route path="/orders" component={ Orders }/>
          <Route path="/auth" component={ Auth }/>
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
