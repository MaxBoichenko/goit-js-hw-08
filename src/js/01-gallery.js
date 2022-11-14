import { galleryItems } from './gallery-items.js';
// Change code below this line
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const containerGallery = document.querySelector('.gallery');

containerGallery.innerHTML = galleryItems
  .map(({ original, preview, description }) => {
    return ` <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
  })
  .join('');
new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
