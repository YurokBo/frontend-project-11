import * as yup from 'yup';
// eslint-disable-next-line import/named
import { reloadRss, getRssRequest, DELAY_RELOAD_RSS } from './utils.js';
import { renderClickedPost } from './renders.js';

export const clickPostsHandler = (event, state) => {
  const { target } = event;

  if (target.nodeName === 'A') {
    renderClickedPost(target);
  }

  if (target.nodeName === 'BUTTON') {
    renderClickedPost(target.previousSibling);
    state.modal.postIds.push(target.dataset.id);
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

  validate(currentUrl, state.form.links)
    .then(() => getRssRequest(currentUrl))
    .then((response) => {
      const { feed, posts } = response;
      state.feeds = [...state.feeds, feed];
      state.posts = [...state.posts, ...posts];
      state.form.isValid = true;
      state.form.error = null;
      state.form.links.push(currentUrl);
      state.form.status = 'sent';
      setTimeout(() => reloadRss(state), DELAY_RELOAD_RSS);
    })
    .catch((err) => {
      state.form.error = err.type;
      state.form.status = 'error';
    });
};
