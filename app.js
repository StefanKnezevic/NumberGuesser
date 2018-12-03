/* 
GAME FUNCTION:
 - Player must guess a number between a min and SVGFEColorMatrixElement
 - Player gets a certain amount of guesses
 - Notify player of guesses remaining
 - Notify the player of the correct answer if loose
 - Let player choose to play again
 */

// game values
let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max 
minNum.textContent = min;
maxNum.textContent = max;

// Play again Event Listener
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        if (confirm('Do you wont to play again ?')) {
            window.location.reload();
        } else {
            window.close();
        }
    }
});

// Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    // Check if won
    if (guess === winningNum) {
        // Game over - won
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
        // Wrong number
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            gameOver(true, `Game Over, you lost. The correct number was ${winningNum}`);
        } else {
            // Game continues - answer is wrong

            // Change border color
            guessInput.style.borderColor = 'red';
            // Clear input 
            guessInput.value = '';
            // Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = 'green';
    // Text color
    message.style.color = color;
    // Set message
    setMessage(msg);
    // Play again
    guessBtn.value = 'Play again';
    guessBtn.className += 'play-again';

}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
