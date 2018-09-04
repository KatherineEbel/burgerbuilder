import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'lettuce'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'},
  { label: 'Onion', type: 'onion'},
  { label: 'Tomato', type: 'tomato'},
];

const buildControls = (props) => (
  <div className={ classes.BuildControls }>
    <p>Current Price: <strong>{ props.price.toFixed(2) }</strong></p>
    { controls.map(ctrl => (
      <BuildControl
        added={ () => props.ingredientAdded(ctrl.type) }
        removed={ () => props.ingredientRemoved(ctrl.type) }
        disabled={ props.disabled[ctrl.type] }
        key={ ctrl.label } label={ ctrl.label }/>
    ))}
    <button className={ classes.OrderButton }
            disabled={ !props.purchaseable }
    >ORDER NOW</button>
  </div>
);

export default buildControls;