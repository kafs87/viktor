import React from 'react';

function ResetButton({ onReset }) {
  return (
    <button onClick={onReset} style={{ backgroundColor: '#dc3545', color: '#fff' }}>
      Resetar
    </button>
  );
}

export default ResetButton;
