
import { fetchImages } from './js/api.js';
import { initializeLightbox } from './js/lightbox.js';


const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const API_KEY = '38183718-5bfc995b87f2a4d0b7b50148b';
let searchQuery = '';
let page = 1;

hideLoadMoreButton(); 

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleSubmit(event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  await fetchImages(API_KEY, searchQuery, page);
  showLoadMoreButton();
}

async function loadMoreImages() {
  page++;
  await fetchImages(API_KEY, searchQuery, page);
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





initializeLightbox();
