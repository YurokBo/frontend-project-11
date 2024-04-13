import { reloadRss, validate, getRssRequest } from './utils.js';

export const clickPostsHandler = (event, state) => {
  const { target } = event;

  if (target.nodeName === 'A') {
    target.classList.replace('fw-bold', 'fw-normal');
    target.classList.add('link-secondary');
  }

  if (target.nodeName === 'BUTTON') {
    target.previousSibling.classList.replace('fw-bold', 'fw-normal');
    target.previousSibling.classList.add('link-secondary');
    state.modal.postId = target.dataset.id;
  }
};

export const formSubmitHandler = async (event, elements, state) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const currentUrl = formData.get('url').trim();

  await validate(currentUrl, state.form.links)
    .then(() => {
      state.form.status = 'sending';
      return getRssRequest(currentUrl);
    })
    .then((response) => {
      const { feed, posts } = response;
      state.feeds = [...state.feeds, feed];
      state.posts = [...state.posts, ...posts];
      state.form.isValid = true;
      state.form.error = null;
      state.form.links.push(currentUrl);
      state.form.status = 'sent';
      setTimeout(() => reloadRss(state), 5000);
    })
    .catch((err) => {
      state.form.error = err.type;
    })
    .finally(() => {
      state.form.status = 'filling';
    });
};
