import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: ''
    },
    loading: false
  };
  
  render() {
    let form = (
      <form action="#">
        <input type="text" placeholder="Your Name"/>
        <input type="text" placeholder="Your Email"/>
        <input type="text" placeholder="Street"/>
        <input type="text" placeholder="Zip Code"/>
        <div className="actions">
          <Button btnType="Danger">CANCEL</Button>
          <Button
            clicked={ this.orderHandler }
            btnType="Success">ORDER</Button>
        </div>
      </form>
    );
    if (this.state.loading) {
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
    this.setState({ isLoading: true });
    const { ingredients, price } = this.state;
    const order = {
      ingredients,
      price,
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
      })
      .catch(e => console.log(e))
      .finally(() => {
        this.setState({ loading: false })
        this.props.history.push('/');
      });
  };
}

export default ContactData;
