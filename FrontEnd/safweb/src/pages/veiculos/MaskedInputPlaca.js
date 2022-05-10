import React from 'react';
import InputMask from 'react-input-mask';

const Placa = (placa) => placa.replace(/[A-Z][a-z]{3}[^0-9]{4}/g, '');

const MaskedInput = ({ value, onChange, name, mask, className, placeholder }) => {
  function handleChange(event) {
    onChange({
      ...event,
      target: {
        ...event.target,
        name,
        value: Placa(event.target.value)
      }
    });
  }

  return (
    <InputMask
      className={className}
      name={name}
      mask={mask}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default MaskedInput;