import i18next from 'i18next';
import * as yup from 'yup';
import view from './view.js';
import resources from './locales/index.js';
import { validate } from './utils.js';

export default async () => {
  const defaultLanguage = 'en';
  const i18n = i18next.createInstance();
  await i18n.init({
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
      isValid: false,
      error: null,
      links: [],
      formStatus: 'filling',
      success: null,
    },
  };

  const watchedState = view(elements, state, i18n);

  yup.setLocale({
    mixed: {
      required: 'errors.required',
      notOneOf: 'errors.duplicatedUrl',
    },
    string: {
      url: 'errors.invalidUrl',
    },
  });

  elements.form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const currentUrl = formData.get('url').trim();

    await validate(currentUrl, watchedState.form.links)
      .then((data) => {
        watchedState.form.isValid = true;
        watchedState.form.error = null;
        watchedState.form.links.push(data);
      })
      .catch((err) => {
        watchedState.form.error = err.message;
      });
  });
};
