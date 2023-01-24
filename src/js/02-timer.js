import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
input.style = 'padding: 3px 20px; font-size: 16px; border-radius: 6px';

const btnStart = document.querySelector('[data-start]');
btnStart.style = 'padding: 3px 20px; font-size: 16px; border-radius: 6px';

btnStart.disabled = true;

const timer = document.querySelector('.timer');
timer.style = 'display: flex; gap: 30px';

const body = document.querySelector('body');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() - selectedDates[0] > 0) {
      btnStart.disabled = true;
      Notify.failure('Please choose a date in the future', {
        timeout: 1500,
        width: '400px',
      });
    } else btnStart.disabled = false;
  },
};

let intervalId = null;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function onBtnStartPushed(e) {
  intervalId = setInterval(() => {
    const countdown = fp.selectedDates[0] - new Date();
    console.log(convertMs(countdown));
    if (countdown < 0) {
      clearInterval(intervalId);
      return;
    }
    showTime(convertMs(countdown));
  }, 1000);
}

function showTime({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

const fp = flatpickr('input', options);
btnStart.addEventListener('click', onBtnStartPushed);
