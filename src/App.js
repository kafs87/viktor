import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameName, setGameName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#ffffff');
  const [buttonColor, setButtonColor] = useState('#f4a261');
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const savedBackgroundColor = localStorage.getItem('backgroundColor');
    const savedTextColor = localStorage.getItem('textColor');
    const savedButtonColor = localStorage.getItem('buttonColor');
    const savedBackgroundImage = localStorage.getItem('backgroundImage');

    if (savedBackgroundColor) setBackgroundColor(savedBackgroundColor);
    if (savedTextColor) setTextColor(savedTextColor);
    if (savedButtonColor) setButtonColor(savedButtonColor);
    if (savedBackgroundImage) setBackgroundImage(savedBackgroundImage);
  }, []);

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color);
    localStorage.setItem('backgroundColor', color);
  };

  const handleTextColorChange = (color) => {
    setTextColor(color);
    localStorage.setItem('textColor', color);
  };

  const handleButtonColorChange = (color) => {
    setButtonColor(color);
    localStorage.setItem('buttonColor', color);
  };

  const handleImageChange = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
      localStorage.setItem('backgroundImage', imageUrl);
    }
  };

  const handleReset = () => {
    setBackgroundColor('#000000');
    setTextColor('#ffffff');
    setButtonColor('#f4a261');
    setBackgroundImage(null);

    localStorage.removeItem('backgroundColor');
    localStorage.removeItem('textColor');
    localStorage.removeItem('buttonColor');
    localStorage.removeItem('backgroundImage');
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
      {/* Imagem do personagem no canto superior esquerdo */}
      <img
        src="img/card-ebony.png" // Substitua pela imagem do personagem
        alt="Personagem"
        className="character-image-left"
      />

      {/* Imagem adicional no canto superior esquerdo */}
      <img
        src="img/health.png" // Substitua pela imagem adicional
        alt="Vida e Escudo do Personagem"
        className="health-image-left"
      />

      {/* Nome do jogo fora da box */}
      <input
        className="game-name-input"
        type="text"
        placeholder="Digite o nome do jogo..."
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
      />

      {/* Box com os controles */}
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

        {/* Controles de personalização */}
        <div className="color-controls">
          <label>
            Fundo:
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => handleBackgroundColorChange(e.target.value)}
            />
          </label>
          <label>
            Texto:
            <input
              type="color"
              value={textColor}
              onChange={(e) => handleTextColorChange(e.target.value)}
            />
          </label>
          <label>
            Botões:
            <input
              type="color"
              value={buttonColor}
              onChange={(e) => handleButtonColorChange(e.target.value)}
            />
          </label>
          <label>
            Imagem de Fundo:
            <input type="file" onChange={(e) => handleImageChange(e.target.files[0])} />
          </label>

        </div>
      </div>
      <p>IEA - 3º E.M.</p>
    </div>
  );
}

export default App;
