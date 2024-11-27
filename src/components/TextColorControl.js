import React from 'react';

const TextColorControl = ({ textColor, onChange }) => (
  <label>
    Cor do Texto:
    <input type="color" value={textColor} onChange={(e) => onChange(e.target.value)} />
    <span className="color-code">{textColor}</span>
  </label>
);

export default TextColorControl;
