import onChange from 'on-change';
import {
  renderError,
  renderFeeds,
  renderPosts,
  renderSuccess,
} from './renders.js';

export default (elements, state, i18n) => onChange(state, (path) => {
  switch (path) {
    case 'form.error':
      renderError(elements, state, i18n);
      break;

    case 'form.isValid':
      renderSuccess(elements, state, i18n);
      break;

    case 'posts':
      renderPosts(elements, state.posts, i18n);
      break;

    case 'feeds':
      renderFeeds(elements, state.feeds, i18n);
      break;

    default:
      break;
  }
});
