import i18next from 'i18next';
import * as yup from 'yup';
import view from './view.js';
import resources from './locales/index.js';
import {
  validate,
  reloadRss,
} from './utils.js';
import { getRssRequest } from './api.js';

export default async () => {
  const defaultLanguage = 'ru';
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
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
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
      clickedPost: '',
      clickedPostId: '',
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
      .then(() => {
        watchedState.form.isValid = true;
        watchedState.form.error = null;

        return getRssRequest(currentUrl);
      })
      .then((response) => {
        watchedState.form.links.push(currentUrl);
        const { feed, posts } = response;
        watchedState.feeds = feed;
        watchedState.posts = [...posts];
        setTimeout(() => reloadRss(watchedState), 5000);
      })
      .catch((err) => {
        watchedState.form.error = err.message;
        watchedState.form.links = [];
      });
  });
};
