// eslint-disable-next-line import/no-cycle
import { createFeeds } from './utils.js';

export default (data) => {
  try {
    const domParser = new DOMParser();

    return createFeeds(domParser.parseFromString(data, 'text/xml'));
  } catch (error) {
    const err = new Error();
    err.name = 'parsingError';

    throw err;
  }
};
