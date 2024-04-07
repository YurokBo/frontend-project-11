import * as yup from 'yup';
// eslint-disable-next-line import/no-cycle
import { getRssRequest } from './api.js';

export const validate = (currentLink, links) => {
  const scheme = yup.string().required().url().notOneOf(links);
  return scheme.validate(currentLink);
};

export const createFeeds = (document) => {
  const feed = {
    title: document.querySelector('title').textContent,
    description: document.querySelector('description').textContent,
    link: document.querySelector('link').textContent,
  };

  const feedItems = document.querySelectorAll('item');
  const posts = [...feedItems].map((feedItem, index) => ({
    id: index,
    title: feedItem.querySelector('title').textContent,
    description: feedItem.querySelector('description').textContent,
    link: feedItem.querySelector('link').textContent,
  }));

  return { feed, posts };
};

const updatePosts = (newPosts, posts) => {
  const postsTitles = posts.map((post) => post.title);
  const diffPosts = newPosts.filter((post) => postsTitles.includes(post));

  if (diffPosts.length) {
    diffPosts.map((post) => posts.push(post));
  }
};

export const reloadRss = async (state) => {
  const { links } = state.form;
  const { posts } = state;
  const requests = links.map((link) => getRssRequest(link));

  Promise.all(requests)
    .then((response) => {
      updatePosts(response, posts);
    })
    .catch((error) => {
      state.form.error = error.message;
    })
    .finally(() => {
      setTimeout(() => reloadRss(state), 5000);
    });
};
