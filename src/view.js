import onChange from 'on-change';
import {
  renderError,
  renderFeeds, renderForm,
  renderModal,
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
    case 'form.links':
      renderPosts(elements, state.posts, i18n);
      break;

    case 'feeds':
      renderFeeds(elements, state.feeds, i18n);
      break;

    case 'modal.postIds':
      renderModal(elements, state, i18n);
      break;

    case 'form.status':
      renderForm(elements, state);
      break;

    default:
      throw new Error(`Unknown event ${path}`);
  }
});
