import * as yup from 'yup';
import { getRssRequest } from './utils.js';

export const clickPostsHandler = (event, state) => {
  const { target } = event;

  if (target.nodeName === 'A') {
    state.clickPostTargetElement = target;
  }

  if (target.nodeName === 'BUTTON') {
    state.clickPostTargetElement = target.previousSibling;
    state.postIds.push(target.dataset.id);
  }
};

const validate = (currentLink, links) => {
  const scheme = yup.string().required().url().notOneOf(links);
  return scheme.validate(currentLink);
};

export const formSubmitHandler = (event, elements, state) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const currentUrl = formData.get('url').trim();

  state.form.status = 'sending';

  validate(currentUrl, state.feeds.feedsLinks)
    .then(() => getRssRequest(currentUrl))
    .then((response) => {
      const { feed, posts } = response;
      state.feeds.feedsContent = [...state.feeds.feedsContent, feed];
      state.posts = [...state.posts, ...posts];
      state.form.isValid = true;
      state.feeds.feedsLinks.push(currentUrl);
      state.form.status = 'success';
      state.form.error = null;
      state.form.isValid = false;
    })
    .catch((err) => {
      state.form.error = err.type;
      state.form.status = 'error';
    });
};
