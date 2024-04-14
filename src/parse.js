import { uniqueId } from 'lodash';

const createFeeds = (document) => {
  const feed = {
    title: document.querySelector('title').textContent,
    description: document.querySelector('description').textContent,
    link: document.querySelector('link').textContent,
  };

  const feedItems = document.querySelectorAll('item');
  const posts = [...feedItems].map((feedItem) => ({
    id: uniqueId(),
    title: feedItem.querySelector('title').textContent,
    description: feedItem.querySelector('description').textContent,
    link: feedItem.querySelector('link').textContent,
  }));

  return { feed, posts };
};

export default (data) => {
  try {
    const domParser = new DOMParser();
    const document = domParser.parseFromString(data, 'text/xml');

    return createFeeds(document);
  } catch (error) {
    const err = new Error();
    err.name = 'parsingError';

    throw err;
  }
};
