import * as yup from 'yup';

export const validate = (currentLink, links) => {
  const scheme = yup.string().required().url().notOneOf(links);
  return scheme.validate(currentLink);
};
