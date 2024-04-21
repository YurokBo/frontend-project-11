import onChange from 'on-change';
import {
  renderClickedPost,
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
      renderSuccess(elements, i18n);
      break;

    case 'posts':
      renderPosts(elements, state, i18n);
      break;

    case 'rssLinks':
      break;

    case 'feeds':
      renderFeeds(elements, state, i18n);
      break;

    case 'modal.postIds':
      renderModal(elements, state, i18n);
      break;

    case 'form.status':
      renderForm(elements, state);
      break;

    case 'clickPostTargetElement':
      renderClickedPost(state.clickPostTargetElement);
      break;

    default:
      throw new Error(`Unknown event ${path}`);
  }
});
