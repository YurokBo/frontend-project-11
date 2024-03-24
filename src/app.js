import { handleFormSubmit/*, handleInputUrl*/ } from './handlers.js';
import view from './view.js';

export default () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    urlInput: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
  };
  const state = {
    form: {
      isValid: true,
      error: null,
      links: [],
      formStatus: 'filling',
    },
  };

  const watchedState = view(state, elements);

  // elements.urlInput.addEventListener('input', (event) => handleInputUrl(event, watchedState));
  elements.form.addEventListener('submit', (event) => handleFormSubmit(event, watchedState));
};
