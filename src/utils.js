import * as yup from 'yup';
import axios from 'axios';
import parse from './parse.js';

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

const createProxyUrl = (url) => {
  const newProxyUrl = new URL('https://allorigins.hexlet.app');
  newProxyUrl.pathname = '/get';
  newProxyUrl.searchParams.append('url', url);
  newProxyUrl.searchParams.append('disableCache', 'true');

  return String(newProxyUrl.href);
};

export const getRssRequest = async (url) => {
  try {
    const { data } = await axios.get(createProxyUrl(url));
    const { contents } = data;

    return createFeeds(parse(contents));
  } catch (error) {
    throw Error(error.message);
  }
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

  await Promise.all(requests)
    .then((response) => {
      updatePosts(response, posts);
    })
    .catch((error) => {
      state.form.error = error.message;
    })
    .finally(() => {
      setTimeout(() => reloadRss(state), 5000);
    });

  return requests;
};
