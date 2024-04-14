import axios from 'axios';
import parse from './parse.js';

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

const updatePosts = (response, posts) => {
  const newPosts = response.posts;
  const loadedPostsTitles = [];

  posts.forEach((post) => loadedPostsTitles.push(post.title));
  const diffPosts = newPosts.filter((post) => !loadedPostsTitles.includes(post.title));

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
      responses.forEach((response) => updatePosts(response, posts));
    })
    .finally(() => {
      setTimeout(() => reloadRss(state), 5000);
    });
};
