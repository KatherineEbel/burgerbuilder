import React from 'react';
import classes from './Order.css'

const order = props => {
  const ingredients = Object.keys(props.ingredients).reduce((ing, nextName) => {
    ing.push({name: nextName, amount: props.ingredients[nextName]});
    return ing;
  },[]);
  const style= {
    textTransform: 'capitalize',
    display: 'inline-block',
    margin: '0 8px',
    border: '1px solid #ccc',
    padding: '5px'
  };
  const ingJSX = ingredients.map(ing => <span style={style} key={ing.name}>{ing.name} ({ing.amount})</span>)
  return (
    <div className={classes.Order}>
      <h4>Ingredients: {ingJSX}</h4>
      <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
    </div>
  );
};

export default order;