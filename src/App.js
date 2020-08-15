import React from 'react';
import Header from './components/Header'
import Figure from './components/Figure'
import WrongLetter from './components/WrongLetter'
import Word from './components/Word'
import Popup from './components/Popup'
import Notification from './components/Notification'
import { showNotification as show } from './helpers/helper'
import './App.css';

const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [correctLetters, setCorrectLetters] = React.useState([]);
  const [wrongLetters, setWrongLetters] = React.useState([]);
  const [playable, setPlayable] = React.useState(true);
  const [showNotification, setShowNotification] = React.useState(false);

  React.useEffect(() => {
    const listener = (event) => {
      if (playable && event.keyCode >= 65 && event.keyCode <= 90) {
        const letter = event.key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(prev => [...prev, letter])
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(prev => [...prev, letter])
          } else {
            show(setShowNotification);
          }
        }
      }
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);

  }, [correctLetters, wrongLetters, playable])

  function playAgain(){
    setPlayable(true);
    // Empty Array
    setCorrectLetters([]);
    setWrongLetters([]);

    let random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetter wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup selectedWord={selectedWord} correctLetters={correctLetters} wrongLetters={wrongLetters} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
