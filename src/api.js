import axios from 'axios';
import parse from './parse.js';

const createProxyUrl = (url) => {
  const newProxyUrl = new URL('https://allorigins.hexlet.app');
  newProxyUrl.pathname = '/get';
  newProxyUrl.searchParams.append('disableCache', 'true');
  newProxyUrl.searchParams.append('url', url);

  return String(newProxyUrl.href);
};

export const getRssRequest = async (url) => {
  try {
    const { data } = await axios.get(createProxyUrl(url));
    const { contents } = data;
    return parse(contents);
  } catch (error) {
    throw Error(error.message);
  }
};
