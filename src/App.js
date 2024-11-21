// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [buttonColor, setButtonColor] = useState('#007bff');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [savedMessage, setSavedMessage] = useState('');
  const [themes, setThemes] = useState({});
  const [themeName, setThemeName] = useState('');

  useEffect(() => {
    const savedBackgroundColor = localStorage.getItem('backgroundColor');
    const savedTextColor = localStorage.getItem('textColor');
    const savedButtonColor = localStorage.getItem('buttonColor');
    const savedBackgroundImage = localStorage.getItem('backgroundImage');
    const savedThemes = JSON.parse(localStorage.getItem('themes')) || {};

    if (savedBackgroundColor) setBackgroundColor(savedBackgroundColor);
    if (savedTextColor) setTextColor(savedTextColor);
    if (savedButtonColor) setButtonColor(savedButtonColor);
    if (savedBackgroundImage) setBackgroundImage(savedBackgroundImage);
    setThemes(savedThemes);
  }, []);

  const handleBackgroundColorChange = (event) => {
    const color = event.target.value;
    setBackgroundColor(color);
    localStorage.setItem('backgroundColor', color);
    showSavedMessage();
  };

  const handleTextColorChange = (event) => {
    const color = event.target.value;
    setTextColor(color);
    localStorage.setItem('textColor', color);
    showSavedMessage();
  };

  const handleButtonColorChange = (event) => {
    const color = event.target.value;
    setButtonColor(color);
    localStorage.setItem('buttonColor', color);
    showSavedMessage();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
      localStorage.setItem('backgroundImage', imageUrl);
      showSavedMessage();
    }
  };

  const saveTheme = () => {
    if (!themeName) return alert("Por favor, insira um nome para o tema");

    const newThemes = {
      ...themes,
      [themeName]: { backgroundColor, textColor, buttonColor, backgroundImage }
    };
    setThemes(newThemes);
    localStorage.setItem('themes', JSON.stringify(newThemes));
    setThemeName('');
    showSavedMessage();
  };

  const loadTheme = (name) => {
    const theme = themes[name];
    if (theme) {
      setBackgroundColor(theme.backgroundColor);
      setTextColor(theme.textColor);
      setButtonColor(theme.buttonColor);
      setBackgroundImage(theme.backgroundImage);
      showSavedMessage();
    }
  };

  const resetColors = () => {
    setBackgroundColor('#ffffff');
    setTextColor('#000000');
    setButtonColor('#007bff');
    setBackgroundImage(null);
    localStorage.removeItem('backgroundColor');
    localStorage.removeItem('textColor');
    localStorage.removeItem('buttonColor');
    localStorage.removeItem('backgroundImage');
  };

  const showSavedMessage = () => {
    setSavedMessage('Configurações salvas!');
    setTimeout(() => setSavedMessage(''), 2000);
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
        color: textColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1>Personalize sua Interface</h1>

      <div className="color-controls">
        <label>
          Cor de Fundo:
          <input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
          <span className="color-code">{backgroundColor}</span>
        </label>

        <label>
          Cor do Texto:
          <input type="color" value={textColor} onChange={handleTextColorChange} />
          <span className="color-code">{textColor}</span>
        </label>

        <label>
          Cor dos Botões:
          <input type="color" value={buttonColor} onChange={handleButtonColorChange} />
          <span className="color-code">{buttonColor}</span>
        </label>

        <label>
          Imagem de Fundo:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
      </div>

      <button style={{ backgroundColor: buttonColor, color: textColor }}>Exemplo de Botão</button>

      <div className="actions">
        <button className="reset-button" onClick={resetColors}>Redefinir para Padrão</button>
      </div>

      <div className="theme-controls">
        <input
          type="text"
          placeholder="Nome do Tema"
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
        />
        <button onClick={saveTheme}>Salvar Tema</button>

        <select onChange={(e) => loadTheme(e.target.value)}>
          <option>Escolha um Tema</option>
          {Object.keys(themes).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {savedMessage && <div className="saved-message">{savedMessage}</div>}
    </div>
  );
}

export default App;
