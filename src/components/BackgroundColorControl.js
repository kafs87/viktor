import React from 'react';

const BackgroundColorControl = ({ backgroundColor, onChange }) => (
  <label>
    Cor de Fundo:
    <input type="color" value={backgroundColor} onChange={(e) => onChange(e.target.value)} />
    <span className="color-code">{backgroundColor}</span>
  </label>
);

export default BackgroundColorControl;
