import * as yup from 'yup';

export const validate = (currentLink, links) => {
  const scheme = yup.string().required().url().notOneOf(links);
  return scheme.validate(currentLink);
};

export const feedHandler = (doc) => {
  console.log('feedHandler', doc);
  const feed = {
    title: doc.querySelector('title').textContent,
    description: doc.querySelector('description').textContent,
    link: doc.querySelector('link').textContent,
  };

  const feedItems = doc.querySelectorAll('item');
  const posts = [...feedItems].map((feedItem, index) => ({
    id: index,
    title: feedItem.querySelector('title').textContent,
    description: feedItem.querySelector('description').textContent,
    link: feedItem.querySelector('link').textContent,
  }));

  return { feed, posts };
};
