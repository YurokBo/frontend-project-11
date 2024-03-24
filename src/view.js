import onChange from 'on-change';
import { renderError, renderSuccess } from './renders.js';

export const render = (state, elements) => (path) => {
  const pathList = {
    'form.links': () => {},
    'form.isValid': renderSuccess,
    'form.error': renderError,
  };

  // if (Object.hasOwn(pathList, path)) {
  //   throw new Error(`Unknown path ${path}`);
  // }

  return pathList[path](state, elements);
};
export default (state, elements) => onChange(state, render(state, elements));
