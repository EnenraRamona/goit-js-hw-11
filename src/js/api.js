import axios from 'axios';
import { createPhotoCard } from './helpers.js';
import Notiflix from 'notiflix';
import { initializeLightbox } from './lightbox.js';

const gallery = document.querySelector('.gallery');

export async function fetchImages(apiKey, searchQuery, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: apiKey,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });

    const data = response.data;

    if (data.hits.length > 0) {
      data.hits.forEach((image) => {
        const card = createPhotoCard(image);
        gallery.appendChild(card);
      });

      if (data.totalHits <= page * 40) {
        hideLoadMoreButton();
      }

      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      scrollToNextGroup();

      initializeLightbox();
    } else {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      hideLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure(
      'An error occurred while fetching images. Please try again later.'
    );
    hideLoadMoreButton();
  }
}

function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.style.display = 'none';
}

function scrollToNextGroup() {
  const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
