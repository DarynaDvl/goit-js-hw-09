import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startButton: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] < currentDate) {
      refs.startButton.disabled = true;
      Notify.warning('Please choose a date in the future');
    } else {
      refs.startButton.disabled = false;
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

refs.startButton.addEventListener('click', onClick);

function onClick() {
  let timerId = setInterval(() => {
    const currentDate = new Date();
    const timeLeft = fp.selectedDates[0] - currentDate;
    if (timeLeft < 0) {
      clearInterval(timerId);
      timerId = null;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    refs.seconds.textContent = toCorrectFormat(seconds);
    refs.minutes.textContent = toCorrectFormat(minutes);
    refs.hours.textContent = toCorrectFormat(hours);
    refs.days.textContent = toCorrectFormat(days);
  }, 1000);
}

function toCorrectFormat(value) {
  return String(value).padStart(2, 0);
}
