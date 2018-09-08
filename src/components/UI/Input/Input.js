import React from 'react';
import classes from './Input.css';

const controlWithProps = props => {
  let formControl = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    console.log(props.elementType, props.invalid);
    inputClasses.push(classes.Invalid)
  }
  switch (props.elementType) {
    case ('input'):
      formControl = <input
        onChange={props.changed}
        value={props.value}
        className={inputClasses.join(' ')}  {...props.elementConfig}/>;
      break;
    case ('select'):
      formControl = (<select
        onChange={props.changed}
        value={props.value}
        className={inputClasses.join(' ')}>
        {props.elementConfig.options.map(o => (
          <option
            key={o.value} value={o.value}>{o.displayValue}</option>
        ))}
      </select>);
      break;
    default:
      formControl = <input
        onChange={props.changed}
        className={inputClasses.join(' ')} {...props.elementConfig}/>;
  }
  return formControl;
};

const input = props => {
  let formControl = controlWithProps(props);
  return (
    <div className={ classes.Input }>
      <label className={ classes.Label }>{props.label}</label>
      { formControl }
    </div>
  );
};

export default input;