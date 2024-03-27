export const renderError = (state, elements) => {
  if (!state.form.isValid) {
    elements.feedback.textContent = state.form.error;
    elements.urlInput.classList.add('is-invalid');
  }
};

export const renderSuccess = (state, elements) => {
  if (state.form.isValid) {
    elements.feedback.textContent = state.form.success;
    elements.urlInput.classList.remove('is-invalid');
    elements.feedback.classList.remove('text-danger');
    elements.feedback.classList.add('text-success');
    elements.urlInput.focus();
    elements.form.reset();
  }
};
