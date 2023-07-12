export function createPhotoCard(image) {
  const card = document.createElement('div');
  card.className = 'photo-card';

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';

  const link = document.createElement('a');
  link.href = image.largeImageURL;
  link.dataset.likes = image.likes;
  link.dataset.views = image.views;
  link.dataset.comments = image.comments;
  link.dataset.downloads = image.downloads;
  link.appendChild(img);

  const caption = document.createElement('span');
  caption.className = 'caption lightbox-caption';
  caption.innerHTML = `<b>Likes:</b> ${image.likes}, <b>Views:</b> ${image.views}, <b>Comments:</b> ${image.comments}, <b>Downloads:</b> ${image.downloads}`;
  link.appendChild(caption);
  caption.style.display = 'none'; 
  img.dataset.caption = caption.innerHTML;

  card.appendChild(link);

  const info = document.createElement('div');
  info.className = 'info';

  const likes = createInfoItem('Likes', image.likes);
  const views = createInfoItem('Views', image.views);
  const comments = createInfoItem('Comments', image.comments);
  const downloads = createInfoItem('Downloads', image.downloads);

  info.append(likes, views, comments, downloads);
  card.append(info);

  return card;
}

export function createInfoItem(label, value) {
  const item = document.createElement('p');
  item.className = 'info-item';
  item.innerHTML = `<b>${label}:</b> ${value}`;

  return item;
}
