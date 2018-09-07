import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  
  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const orders = Object.keys(res.data).reduce((orders, key) => {
          orders.push({
            ...res.data[key],
            id: key
          });
          return orders;
        },[]);
        this.setState({ orders })
      })
      .catch(e => console.log(e))
      .finally(() => this.setState({ loading: false }))
  }
  render() {
    return (
      <div>
        { this.state.orders.map(o => (
          <Order
            key={ o.id }
            ingredients={ o.ingredients }
            price={ o.price }
          />))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);