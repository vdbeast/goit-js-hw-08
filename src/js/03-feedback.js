import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailInput = formEl.querySelector('input[name="email"]');
const messageInput = formEl.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

const updatedStorage = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500);

const completedFields = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email || '';
    messageInput.value = formData.message || '';
  }
};

formEl.addEventListener('input', () => {
  updatedStorage();
});

window.addEventListener('load', () => {
  completedFields();
});

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';
  console.log('Submitted:', {
    email: emailInput.value,
    message: messageInput.value,
  });
});