import * as yup from 'yup';

export const validate = (currentLink, links, i18n) => {
  const { t } = i18n;
  const scheme = yup.string().required().url(t('errors.invalidUrl')).notOneOf(links, t('errors.duplicatedUrl'));
  return scheme.validate(currentLink);
};
