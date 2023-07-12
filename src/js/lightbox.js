import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function initializeLightbox() {
  const lightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionType: 'data',
    captionsData: 'caption',
  });

  lightbox.on('show.simplelightbox', function () {
    const currentCaption = this.element().querySelector('.lightbox-caption');
    currentCaption.style.display = 'block'; 
  });

  lightbox.refresh();
}
