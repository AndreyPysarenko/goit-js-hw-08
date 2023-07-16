// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

const listGallery = document.querySelector('.gallery');

listGallery.insertAdjacentHTML('afterbegin', galleryItemsMarkup(galleryItems));

function galleryItemsMarkup(items) {
  const contentMarkup = items.map(({ preview, original, description }) => {
    return `
        <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"           
            alt="${description}"
          />
        </a>
      </li>`;
  });
  return contentMarkup.join('');
}

const lightbox = new SimpleLightbox('.gallery__link', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);
