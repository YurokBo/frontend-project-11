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

  feedback.textContent = i18n.t(`${state.form.error}`);
  feedback.classList.remove('text-success');
  feedback.classList.add('text-danger');
  urlInput.classList.add('is-invalid');
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
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const cardTitle = document.createElement('h4');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = i18n.t('feeds.title');
  cardBody.append(cardTitle);
  card.append(cardBody);

  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group', 'border-0', 'rounded-0');
  card.append(listGroup);

  feeds.forEach((feed) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.classList.add('list-group-item', 'border-0', 'border-end-0');
    listGroup.append(listGroupItem);

    const feedTitle = document.createElement('h6');
    feedTitle.classList.add('h6', 'm-0');
    feedTitle.textContent = feed.title;
    listGroupItem.append(feedTitle);
    const feedText = document.createElement('p');
    feedText.classList.add('m-0', 'small', 'text-black-50');
    feedText.textContent = feed.description;
    listGroupItem.append(feedText);
  });

  elements.feeds.append(card);
};

export const renderModal = (elements, state, i18n) => {
  const { t } = i18n;
  const { title, description, link } = state.posts[state.modal.postId];
  const { modal } = elements;

  state.modal.postData = { title, description, link };
  modal.title.textContent = title;
  modal.text.textContent = description;
  modal.link.setAttribute('href', link);
  modal.link.textContent = t('modal.link');
  modal.button.textContent = t('modal.button');
};
