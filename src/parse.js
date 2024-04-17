export default (data) => {
  try {
    const domParser = new DOMParser();
    return domParser.parseFromString(data, 'text/xml');
  } catch (error) {
    const err = new Error();
    err.name = 'parsingError';

    throw err;
  }
};
