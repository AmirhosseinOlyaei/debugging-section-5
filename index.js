const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  const guess = parseInt(guessInput.value, 10);

  hideAllMessages();

  if (isNaN(guess)) {
    displayErrorMessage(numberOfGuessesMessage, 'Please enter a valid number.', true);
    return;
  }

  if (guess < 1) {
    displayErrorMessage(numberOfGuessesMessage, 'Must be greater than 0', true);
    return;
  }

  if (guess > 99) {
    displayErrorMessage(numberOfGuessesMessage, 'Must be less than 100', true);
    return;
  }

  attempts++;

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} ${attempts === 1 ? 'guess' : 'guesses'}`;

    correctMessage.style.display = '';

    disableGame();
  } else {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${remainingAttempts === 1 ? 'guess' : 'guesses'} remaining`;

    if (attempts === maxNumberOfAttempts) {
      disableGame();
      maxGuessesMessage.style.display = '';
    }
  }

  guessInput.value = '';
  guessInput.focus();
}

function disableGame() {
  submitButton.disabled = true;
  guessInput.disabled = true;
}

function enableGame() {
  submitButton.disabled = false;
  guessInput.disabled = false;
}

function resetGame() {
  enableGame();
  setup();
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function displayErrorMessage(element, message, showError) {
  element.style.display = showError ? 'block' : 'none';
  element.innerHTML = message;
  element.style.color = 'red';
}

function setup() {
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  attempts = 0;

  hideAllMessages();
  resetButton.style.display = 'block'; // Show the reset button

  guessInput.value = '';
  guessInput.focus();
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame);
guessInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    checkGuess();
  }
});

setup();
