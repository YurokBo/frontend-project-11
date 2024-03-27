import i18next from 'i18next';
import { handleFormSubmit } from './handlers.js';
import view from './view.js';
import resources from './locales/index.js';

export default async () => {
  const defaultLanguage = 'en';
  const i18nInstance = i18next.createInstance();
  await i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  });
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
      success: null,
    },
  };

  const watchedState = view(state, elements);

  // elements.urlInput.addEventListener('input', (event) => handleInputUrl(event, watchedState));
  elements.form.addEventListener('submit', (event) => handleFormSubmit(event, watchedState, i18nInstance));
};
