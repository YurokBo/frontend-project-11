export default (data) => {
  const domParser = new DOMParser();
  const parsedDom = domParser.parseFromString(data, 'text/xml');
  const errorNode = parsedDom.querySelector('parsererror');

  if (errorNode) {
    const err = new Error();
    err.name = 'parsingError';

    throw err;
  }

  const title = parsedDom.querySelector('title').textContent;
  const description = parsedDom.querySelector('description').textContent;
  const link = parsedDom.querySelector('link').textContent;
  const items = parsedDom.querySelectorAll('item');

  return {
    title,
    description,
    link,
    items,
  };
};
