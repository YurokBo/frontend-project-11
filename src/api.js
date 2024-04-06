import axios from 'axios';
import parse from './parse.js';
import { createFeeds } from './utils.js';

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
