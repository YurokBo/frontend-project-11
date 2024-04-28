export default (data) => {
  const domParser = new DOMParser();
  const parsedDom = domParser.parseFromString(data, 'text/xml');
  const errorNode = parsedDom.querySelector('parsererror');

  if (errorNode) {
    const err = new Error();
    err.name = 'parsingError';

    throw err;
  }

  const feed = {
    title: parsedDom.querySelector('title').textContent,
    description: parsedDom.querySelector('description').textContent,
    link: parsedDom.querySelector('link').textContent,
  };

  const feedItems = parsedDom.querySelectorAll('item');
  const posts = [...feedItems].map((feedItem) => ({
    title: feedItem.querySelector('title').textContent,
    description: feedItem.querySelector('description').textContent,
    link: feedItem.querySelector('link').textContent,
  }));

  return { feed, posts };
};
