import i18next from 'i18next';
import * as yup from 'yup';
import view from './view.js';
import resources from './locales/index.js';
import { renderPage } from './renders.js';
import { clickPostsHandler, formSubmitHandler } from './handlers.js';

export default async () => {
  const defaultLanguage = 'ru';
  const i18n = i18next.createInstance();
  await i18n.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  });
  const elements = {
    main: {
      title: document.querySelector('h1'),
      text: document.querySelector('p.lead.big-title'),
      exampleLink: document.querySelector('p.text-muted'),
    },
    form: {
      form: document.querySelector('.rss-form'),
      urlInput: document.querySelector('#url-input'),
      feedback: document.querySelector('.feedback'),
      button: document.querySelector('form button[type="submit"]'),
      label: document.querySelector('form label[for="url-input"]'),
    },
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
    modal: {
      title: document.querySelector('.modal-title'),
      text: document.querySelector('.modal-body'),
      link: document.querySelector('.modal-footer a'),
      button: document.querySelector('.modal-footer button'),
    },
  };
  const state = {
    form: {
      isValid: false,
      error: null,
      links: [],
      formStatus: 'filling',
      success: null,
    },
    feeds: [],
    posts: [],
    modal: {
      postId: null,
      postData: {},
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

  window.addEventListener('DOMContentLoaded', () => renderPage(elements, i18n));

  elements.form.form.addEventListener('submit', (event) => formSubmitHandler(event, watchedState));

  elements.posts.addEventListener('click', (event) => clickPostsHandler(event, watchedState));
};
