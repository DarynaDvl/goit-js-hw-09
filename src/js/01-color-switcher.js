const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let timerId = null;

startButton.addEventListener('click', onStart);
stopButton.addEventListener('click', onStop);

function onStart() {
  if (!timerId) {
    timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startButton.toggleAttribute('disabled');
    stopButton.toggleAttribute('disabled');
  }
}

function onStop() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    startButton.toggleAttribute('disabled');
    stopButton.toggleAttribute('disabled');
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
