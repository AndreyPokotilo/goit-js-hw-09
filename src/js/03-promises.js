import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  let delay = Number(e.target.delay.value);
  const step = Number(e.target.step.value);
  const amount = Number(e.target.amount.value);
  console.log({delay, step, amount});

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    console.log("delay:", delay);
    delay += step;
  }

  e.currentTarget.elements.step.value = '';
  e.currentTarget.elements.delay.value = '';
  e.currentTarget.elements.amount.value = '';
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objValue = { position, delay };
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(objValue);
    } else {
      reject(objValue);
    }
  });
}
