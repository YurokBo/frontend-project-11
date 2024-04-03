export const renderError = (elements, state, i18n) => {
  elements.feedback.textContent = i18n.t(`${state.form.error}`);
  elements.feedback.classList.remove('text-success');
  elements.feedback.classList.add('text-danger');
  elements.urlInput.classList.add('is-invalid');
};

export const renderSuccess = (elements, state, i18n) => {
  elements.feedback.textContent = i18n.t('success.successLoaded');
  elements.urlInput.classList.remove('is-invalid');
  elements.feedback.classList.remove('text-danger');
  elements.feedback.classList.add('text-success');
  elements.urlInput.focus();
  elements.form.reset();
  state.form.error = null;
  state.form.isValid = false;
};
