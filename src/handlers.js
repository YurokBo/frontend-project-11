import { validate } from './utils.js';

// export const handleInputUrl = (event, state) => {
//   state.form.link = event.target.value;
// };

export const handleFormSubmit = async (event, state, i18n) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const currentUrl = formData.get('url').trim();

  await validate(currentUrl, state.form.links, i18n)
    .then(() => {
      state.form.isValid = true;
      state.form.links.push(currentUrl);
      state.form.error = null;
      state.form.success = i18n.t('success.successLoaded');
    })
    .catch((err) => {
      state.form.isValid = false;
      state.form.error = err.message;
    });
};
