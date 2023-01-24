function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

btnStartEl.addEventListener('click', onStartClick);
btnStopEl.addEventListener('click', onStopClick);

function switchColors() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

let timer;

function onStartClick() {
  timer = setInterval(switchColors, 1000);
  btnStartEl.toggleAttribute('disabled');
}

function onStopClick() {
  clearInterval(timer);
  btnStartEl.removeAttribute('disabled');
}
