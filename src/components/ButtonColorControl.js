import React from 'react';

const ButtonColorControl = ({ buttonColor, onChange }) => (
  <label>
    Cor dos Botões:
    <input type="color" value={buttonColor} onChange={(e) => onChange(e.target.value)} />
    <span className="color-code">{buttonColor}</span>
  </label>
);

export default ButtonColorControl;
