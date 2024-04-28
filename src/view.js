import onChange from 'on-change';
import {
  renderClickedPost,
  renderFeeds,
  renderForm,
  renderModal,
  renderPosts,
} from './renders.js';

export default (elements, state, i18n) => onChange(state, (path) => {
  switch (path) {
    case 'posts':
      renderPosts(elements, state, i18n);
      break;

    case 'feeds.feedsLinks':
      break;

    case 'feeds.feedsContent':
      renderFeeds(elements, state, i18n);
      break;

    case 'postIds':
      renderModal(elements, state, i18n);
      break;

    case 'form.status':
    case 'form.error':
      renderForm(elements, state, i18n);
      break;

    case 'clickPostTargetElement':
      renderClickedPost(state.clickPostTargetElement);
      break;

    default:
      throw new Error(`Unknown event ${path}`);
  }
});
