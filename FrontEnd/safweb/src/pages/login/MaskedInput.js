import React from 'react';
import InputMask from 'react-input-mask';
import './login.css'

const MaskPlaca = (placa) => placa.replace(/[a-z][A-Z]{3}[0-9]{4}/g, '');

const MaskCPF = (cpf) => cpf.replace(/[0-9]/g, '');

const MaskedInput = ({ value, onChange, name, mask, className, placeholder }) => {
  function handleChange(event) {
    onChange({
      ...event,
      target: {
        ...event.target,
        name,
        value: MaskPlaca(event.target.value),
        value: MaskCPF(event.target.value)
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