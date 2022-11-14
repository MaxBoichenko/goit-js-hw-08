import throttle from 'lodash.throttle';

const formEL = document.querySelector('.feedback-form');

const KEY = 'feedback-form-state';
const obj = {};

const onLoad = () => {
  if (localStorage.getItem(KEY)) {
    const localObj = JSON.parse(localStorage.getItem(KEY));

    for (const key in localObj) {
      if (Object.hasOwnProperty.call(localObj, key)) {
        formEL.elements[key].value = localObj[key];
        obj[key] = localObj[key];
      }
    }
  }
};

const onInputForm = event => {
  obj[event.target.name] = event.target.value;
  localStorage.setItem(KEY, JSON.stringify(obj));
};
const throttledInput = throttle(onInputForm, 500);

const clearStorage = event => {
  event.preventDefault();

  console.log(JSON.parse(localStorage.getItem(KEY)));

  localStorage.removeItem(KEY);
  event.target.reset();
};

formEL.addEventListener('input', throttledInput);
formEL.addEventListener('submit', clearStorage);
addEventListener('load', onLoad);
