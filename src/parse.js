export default (data) => {
  const domParser = new DOMParser();

  return domParser.parseFromString(data, 'text/xml');
};
