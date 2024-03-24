import { validate } from './utils.js';

// export const handleInputUrl = (event, state) => {
//   state.form.link = event.target.value;
// };

export const handleFormSubmit = async (event, state) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const currentUrl = formData.get('url').trim();

  await validate(currentUrl, state.form.links).then((res) => {
    state.form.isValid = true;
    state.form.links.push(currentUrl);
    state.form.error = null;
  }).catch((err) => {
    state.form.isValid = false;
    state.form.error = err.message;
  });
};
