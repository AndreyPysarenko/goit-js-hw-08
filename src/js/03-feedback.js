import throttle from 'lodash.throttle';

const onFormRef = document.querySelector('.feedback-form');
const { email, message } = onFormRef.elements;
const STORAGE_KEY = 'feedback-form-state';

onFormRef.addEventListener('submit', onFormSubmit);
onFormRef.addEventListener('input', throttle(onFormInput, 500));

populateForm();

function onFormSubmit(event) {
  event.preventDefault();
  if (email.value === '' || message.value === '')
    return alert('Заповніть будь ласка всі поля!');

  const consoleMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const formDate = {email: consoleMessage.email, message: consoleMessage.message};
  console.log(formDate);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput() {
  const userEmail = email.value;
  const userMessage = message.value;

  const userDate = {
    email: userEmail,
    message: userMessage,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userDate));
}

function populateForm() {
  const saveDate = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (saveDate) {
    email.value = saveDate.email;
    message.value = saveDate.message;
  }
}
