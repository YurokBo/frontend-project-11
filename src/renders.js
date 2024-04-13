export const renderPage = (elements, i18n) => {
  const { t } = i18n;
  const { main, form } = elements;

  main.title.textContent = t('main.title');
  main.text.textContent = t('main.text');
  main.exampleLink.textContent = t('main.exampleLink');
  form.button.textContent = t('form.button');
  form.label.textContent = t('form.label');
  form.urlInput.setAttribute('placeholder', t('form.placeholder'));
};

export const renderError = (elements, state, i18n) => {
  const { feedback, urlInput } = elements.form;
  const { t } = i18n;

  feedback.classList.remove('text-success');
  feedback.classList.add('text-danger');
  urlInput.classList.add('is-invalid');
  urlInput.focus();

  switch (state.form.error) {
    case 'networkError':
      feedback.textContent = t('errors.networkError');
      break;

    case 'parsingError':
      feedback.textContent = t('errors.resourceInvalid');
      break;

    case 'url':
      feedback.textContent = t('errors.invalidUrl');
      break;

    case 'notOneOf':
      feedback.textContent = t('errors.duplicatedUrl');
      break;

    case 'required':
      feedback.textContent = t('errors.required');
      break;

    default:
      throw new Error(`Unknown error type ${state.form.error}`);
  }
};

export const renderSuccess = (elements, state, i18n) => {
  const { form, feedback, urlInput } = elements.form;

  feedback.textContent = i18n.t('success.successLoaded');
  urlInput.classList.remove('is-invalid');
  feedback.classList.remove('text-danger');
  feedback.classList.add('text-success');
  urlInput.focus();
  form.reset();
  state.form.error = null;
  state.form.isValid = false;
};

export const renderPosts = (elements, posts, i18n) => {
  elements.posts.innerHTML = '';
  const { t } = i18n;

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const cardTitle = document.createElement('h4');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = t('posts.title');
  cardBody.append(cardTitle);
  card.append(cardBody);

  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group', 'border-0', 'rounded-0');
  card.append(listGroup);

  posts.forEach((post) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const link = document.createElement('a');
    listGroupItem.append(link);

    link.classList.add('fw-bold');
    link.setAttribute('target', 'blank');

    const button = document.createElement('button');
    listGroupItem.append(button);

    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = t('posts.button');

    link.textContent = post.title;
    link.setAttribute('href', post.link);
    link.setAttribute('data-id', post.id);
    button.setAttribute('data-id', post.id);

    listGroup.append(listGroupItem);
  });

  elements.posts.append(card);
};

export const renderFeeds = (elements, feeds, i18n) => {
  elements.feeds.innerHTML = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h4');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = i18n.t('feeds.title');
  cardBody.append(cardTitle);

  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group', 'border-0', 'rounded-0');

  card.append(cardBody, listGroup);

  feeds.forEach((feed) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.classList.add('list-group-item', 'border-0', 'border-end-0');
    listGroup.append(listGroupItem);

    const feedTitle = document.createElement('h6');
    feedTitle.classList.add('h6', 'm-0');
    feedTitle.textContent = feed.title;

    const feedText = document.createElement('p');
    feedText.classList.add('m-0', 'small', 'text-black-50');
    feedText.textContent = feed.description;

    listGroupItem.append(feedTitle, feedText);
  });

  elements.feeds.append(card);
};

export const renderModal = (elements, state, i18n) => {
  const { t } = i18n;
  const post = state.posts.find(({ id }) => id === state.modal.postId);
  const { title, description, link } = post;
  const { modal } = elements;

  state.modal.postData = { title, description, link };
  modal.title.textContent = title;
  modal.text.textContent = description;
  modal.link.setAttribute('href', link);
  modal.link.textContent = t('modal.link');
  modal.button.textContent = t('modal.button');
};

export const renderForm = (elements, state) => {
  const { button } = elements.form;
  const { status } = state.form;

  switch (status) {
    case 'filling':
    case 'sent':
      button.classList.remove('disabled');
      break;

    case 'sending':
      button.classList.add('disabled');
      break;

    default:
      throw new Error(`Unknoun status ${status}`);
  }
};

export const renderClickedPost = (targetElement) => {
  targetElement.classList.replace('fw-bold', 'fw-normal');
  targetElement.classList.add('link-secondary');
};
