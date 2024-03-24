export const renderError = (state, elements) => {
  if (!state.form.isValid) {
    elements.feedback.textContent = state.form.error;
    elements.urlInput.classList.add('is-invalid');
  }
};

export const renderSuccess = (state, elements) => {
  if (state.form.isValid) {
    elements.feedback.textContent = null;
    elements.urlInput.classList.remove('is-invalid');
    elements.urlInput.focus();
    elements.form.reset();
  }
};
