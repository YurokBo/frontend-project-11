import * as yup from 'yup';

export const validate = (currentLink, links) => {
  const scheme = yup.string().required().url().notOneOf(links);
  return scheme.validate(currentLink);
};

export const feedHandler = (document) => {
  console.log('feedHandler', document);
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
