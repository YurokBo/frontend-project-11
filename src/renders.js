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
  state.modal.postData = { title, description, link };

  elements.modal.title.textContent = title;
  elements.modal.text.textContent = description;
  elements.modal.link.setAttribute('href', link);
  elements.modal.link.textContent = t('modal.link');
  elements.modal.button.textContent = t('modal.button');
};
