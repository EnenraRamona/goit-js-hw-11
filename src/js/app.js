import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const API_KEY = '38183718-5bfc995b87f2a4d0b7b50148b';
let searchQuery = '';
let page = 1;

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleSubmit(event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();
  page = 1;
  clearGallery();
  await fetchImages();
  showLoadMoreButton();
}

async function loadMoreImages() {
  page++;
  await fetchImages();
}

async function fetchImages() {
  const response = await fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  const data = await response.json();

  if (data.hits.length > 0) {
    data.hits.forEach(image => {
      const card = createPhotoCard(image);
      gallery.appendChild(card);
    });

    initializeLightbox(); // Оновлено
    showLoadMoreButton();

    if (data.totalHits <= page * 40) {
      hideLoadMoreButton();
    }

    showNotification(`Hooray! We found ${data.totalHits} images.`);
    scrollToNextGroup();
  } else {
    showNotification("Sorry, there are no images matching your search query. Please try again.");
    hideLoadMoreButton();
  }
}

function createPhotoCard(image) {
  const card = document.createElement('div');
  card.className = 'photo-card';

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';

  const link = document.createElement('a'); 
  link.href = image.largeImageURL;
  link.appendChild(img); 
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

function createInfoItem(label, value) {
  const item = document.createElement('p');
  item.className = 'info-item';
  item.innerHTML = `<b>${label}:</b> ${value}`;

  return item;
}

function initializeLightbox() {
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}

function showNotification(message) {
  Notiflix.Notify.success(message, {
    position: 'right-top',
    timeout: 3000,
  });
}

function scrollToNextGroup() {
  const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
