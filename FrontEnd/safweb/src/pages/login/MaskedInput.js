import React from 'react';
import InputMask from 'react-input-mask';
import './login.css'

const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

const MaskedInput = ({ value, onChange, name, mask, className, placeholder }) => {
  function handleChange(event) {
    onChange({
      ...event,
      target: {
        ...event.target,
        name,
        value: onlyNumbers(event.target.value)
      }
    });
  }

  return (
    <InputMask
      name={name}
      className={className}
      mask={mask}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default MaskedInput;