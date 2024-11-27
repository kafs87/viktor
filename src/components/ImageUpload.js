import React from 'react';

const ImageUpload = ({ onChange }) => (
  <label>
    Imagem de Fundo:
    <input type="file" accept="image/*" onChange={(e) => onChange(e.target.files[0])} />
  </label>
);

export default ImageUpload;
