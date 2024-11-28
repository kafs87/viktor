import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameName, setGameName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#ffffff');
  const [buttonColor, setButtonColor] = useState('#f4a261');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [placeholderColor, setPlaceholderColor] = useState('#ffffff');

  useEffect(() => {
    const savedBackgroundColor = localStorage.getItem('backgroundColor');
    const savedTextColor = localStorage.getItem('textColor');
    const savedButtonColor = localStorage.getItem('buttonColor');
    const savedBackgroundImage = localStorage.getItem('backgroundImage');
    const savedPlaceholderColor = localStorage.getItem('placeholderColor');

    if (savedBackgroundColor) setBackgroundColor(savedBackgroundColor);
    if (savedTextColor) setTextColor(savedTextColor);
    if (savedButtonColor) setButtonColor(savedButtonColor);
    if (savedBackgroundImage) setBackgroundImage(savedBackgroundImage);
    if (savedPlaceholderColor) setPlaceholderColor(savedPlaceholderColor);
  }, []);

  const handlePlaceholderColorChange = (color) => {
    setPlaceholderColor(color);
    localStorage.setItem('placeholderColor', color);
  };

  // Função handleImageChange definida para lidar com a mudança de imagem de fundo
  const handleImageChange = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
      localStorage.setItem('backgroundImage', imageUrl);
    }
  };

  const handleReset = () => {
    const userConfirmed = window.confirm('Tem certeza de que deseja resetar todas as configurações?');
  if (!userConfirmed) return;
    setBackgroundColor('#000000');
    setTextColor('#ffffff');
    setButtonColor('#f4a261');
    setBackgroundImage(null);
    setPlaceholderColor('#ffffff');
    setGameName(''); 

    localStorage.removeItem('backgroundColor');
    localStorage.removeItem('textColor');
    localStorage.removeItem('buttonColor');
    localStorage.removeItem('backgroundImage');
    localStorage.removeItem('placeholderColor');
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
      <img
        src="img/card-viktor.png"
        alt="Personagem"
        className="character-image-left"
      />

      <img
        src="img/health.png"
        alt="Vida e Escudo do Personagem"
        className="health-image-left"
      />

      <input
        className="game-name-input"
        type="text"
        placeholder="Digite o nome do jogo..."
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        style={{
          '--placeholder-color': placeholderColor, // Passa a cor para o CSS via variável
        }}
      />

      <div className="game-container">
        <div className="menu-box">
          <button style={{ backgroundColor: buttonColor, color: textColor }}>RESUME</button>
          <button style={{ backgroundColor: buttonColor, color: textColor }}>MENU</button>
          <button style={{ backgroundColor: buttonColor, color: textColor }}>OPTIONS</button>
          <button
            className="reset-button"
            onClick={handleReset}
            style={{ backgroundColor: '#e63946', color: '#fff' }}
          >
            RESET
          </button>
        </div>
      </div>

      <div className="footer">
        <div className="left-controls">
          <label>
            Fundo:
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </label>
          <label>
            Texto:
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </label>
          <label>
            Botões:
            <input
              type="color"
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
            />
          </label>
          <label>
            Título:
            <input
              type="color"
              value={placeholderColor}
              onChange={(e) => handlePlaceholderColorChange(e.target.value)}
            />
          </label>
        </div>

        <div className="center-text">
          <p>IEA - 3º E.M.</p>
        </div>

        <div className="right-controls">
          <label className="bglabel">
            <p>Imagem de Fundo:</p>
            <input type="file" onChange={(e) => handleImageChange(e.target.files[0])} />
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
