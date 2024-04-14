import axios from 'axios';
import parse from './parse.js';

export const DELAY_RELOAD_RSS = 5000;

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

    return parse(contents);
  } catch (error) {
    if (error.name === 'parsingError') {
      const parsingError = new Error();
      parsingError.type = 'parsingError';
      throw parsingError;
    }

    if (error.name === 'AxiosError') {
      const networkError = new Error();
      networkError.type = 'networkError';
      throw networkError;
    }

    return error.name;
  }
};

const updatePosts = (newPosts, posts) => {
  const postsTitles = [];

  posts.forEach((post) => postsTitles.push(post.title));
  const diffPosts = newPosts.filter((post) => !postsTitles.includes(post.title));

  if (diffPosts.length !== 0) {
    diffPosts.forEach((diffPost) => posts.push(diffPost));
  }
};

export const reloadRss = async (state) => {
  const { links } = state.form;
  const { posts } = state;
  const requests = links.map((link) => getRssRequest(link));

  await Promise.all(requests)
    .then((responses) => {
      responses.forEach((response) => updatePosts(response.posts, posts));
    })
    .finally(() => {
      setTimeout(() => reloadRss(state), DELAY_RELOAD_RSS);
    });
};
