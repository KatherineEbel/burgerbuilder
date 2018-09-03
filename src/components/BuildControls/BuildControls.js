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
    { controls.map(ctrl => (
      <BuildControl key={ ctrl.label } label={ ctrl.label }/>
    ))}
  </div>
);

export default buildControls;