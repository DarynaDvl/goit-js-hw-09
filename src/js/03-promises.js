import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const data = new FormData(form);
  const result = {};

  for (const [key, value] of data.entries()) {
    result[key] = Number(value);
  }

  let { amount, delay, step } = result;
  for (let i = 0; i < amount; i++) {
    createPromise(i, delay).then(onRes).catch(onRej);
    delay += step;
  }
  form.reset();
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

function onRes({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onRej({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
