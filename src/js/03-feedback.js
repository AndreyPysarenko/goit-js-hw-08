import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name="email"]'),
  textarea: document.querySelector('[name="message"]'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

populateForm();

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function onFormInput() {
  formData[refs.email.name] = refs.email.value;
  formData[refs.textarea.name] = refs.textarea.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedText = localStorage.getItem(STORAGE_KEY);
  if (savedText) {
    refs.email.value = JSON.parse(savedText).email;
    refs.textarea.value = JSON.parse(savedText).message;
  }
}
