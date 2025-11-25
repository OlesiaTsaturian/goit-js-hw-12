import SimpleLightbox from 'simplelightbox';

const refs = {
  searchGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.js-loader'),
};

const createGalleryItem = imgInfo => {
  return `<li class="gallery-item">
             <a href ="${imgInfo.largeImageURL}">
             <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}"/> 
             </a> 

<ul class = "img-info-list">
 <li class="img-info-item"><span class="img-item-desc">Likes</span> ${imgInfo.likes}</li>
 <li class="img-info-item"><span class="img-item-desc">Vievs </span> ${imgInfo.views}</li>
 <li class="img-info-item"><span class="img-item-desc">Comments </span> ${imgInfo.comments}</li>
 <li class="img-info-item"><span class="img-item-desc">Downloads</span> ${imgInfo.downloads}</li>
</ul>

          </li>`;
};

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const createGallery = images => {
  const markup = images.map(imgItem => createGalleryItem(imgItem)).join('');

  refs.searchGallery.innerHTML = markup;
  gallery.refresh();
};

export const clearGallery = () => (refs.searchGallery.innerHTML = '');

export const showLoader = () => {
  refs.loader.classList.remove('is-hidden');
};
export const hideLoader = () => {
  refs.loader.classList.add('is-hidden');
};
