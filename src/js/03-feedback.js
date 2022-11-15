import throttle from 'lodash.throttle';

const formEL = document.querySelector('.feedback-form');

const KEY = 'feedback-form-state';
const obj = {};

const onLoad = () => {
  if (localStorage.getItem(KEY)) {
    const localObj = JSON.parse(localStorage.getItem(KEY));
    Object.entries(localObj).forEach(([key, value]) => {
      formEL.elements[key].value = value;
      obj[key] = value;
    });
  }
};

const onInputForm = event => {
  obj[event.target.name] = event.target.value;
  localStorage.setItem(KEY, JSON.stringify(obj));
};
const throttledInput = throttle(onInputForm, 500);

const clearStorage = event => {
  event.preventDefault();

  localStorage.removeItem(KEY);
  for (const prop of Object.getOwnPropertyNames(obj)) {
    delete obj[prop];
  }
  event.target.reset();
};

formEL.addEventListener('input', throttledInput);
formEL.addEventListener('submit', clearStorage);
window.addEventListener('load', onLoad);
