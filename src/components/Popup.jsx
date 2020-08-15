import React from 'react'
import { checkWin } from '../helpers/helper';

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain }) => {
    let finalMessage = '';
    let finalMessageRevealWord = '';
    let playable = true;

    if (checkWin(correctLetters, wrongLetters, selectedWord) === 'win') {
        finalMessage = 'Congratulations you win!';
        playable = false;
    } else if (checkWin(correctLetters, wrongLetters, selectedWord) === 'loss') {
        finalMessage = 'Unfortunately you lost!';
        finalMessageRevealWord = `... the word was: ${selectedWord}`
        playable = false;
    }

    React.useEffect(() => setPlayable(playable))

    return (
        <div className="popup-container" style={finalMessage !== '' ? {display: "flex"} : {}} >
            <div className="popup">
                <h2>{finalMessage}</h2>
                <h3>{finalMessageRevealWord}</h3>
                <button onClick={playAgain}>Play Again</button>
            </div>
        </div>
    )
}

export default Popup
