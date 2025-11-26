import SimpleLightbox from 'simplelightbox';

const refs = {
  searchGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.js-loader'),
  loadMoreBtn: document.querySelector('.load-btn-js'),
};

const createGalleryItem = ({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `<li class="gallery-item">
             <a href ="${largeImageURL}">
             <img class="gallery-img" src="${webformatURL}" alt="${tags}"/> 
             </a> 

            <ul class = "img-info-list">
            <li class="img-info-item"><span class="img-item-desc">Likes</span> ${likes}</li>
            <li class="img-info-item"><span class="img-item-desc">Vievs </span> ${views}</li>
            <li class="img-info-item"><span class="img-item-desc">Comments </span> ${comments}</li>
            <li class="img-info-item"><span class="img-item-desc">Downloads</span> ${downloads}</li>
            </ul>

          </li>`;
};

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const createGallery = images => {
  const markup = images.map(imgItem => createGalleryItem(imgItem)).join('');

  refs.searchGallery.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
};

export const clearGallery = () => (refs.searchGallery.innerHTML = '');

export const showLoader = () => {
  refs.loader.classList.remove('is-hidden');
};
export const hideLoader = () => {
  refs.loader.classList.add('is-hidden');
};

export const showLoadMoreButton = () => {
  refs.loadMoreBtn.classList.remove('is-hidden');
};

export const hideLoadMoreButton = () => {
  refs.loadMoreBtn.classList.add('is-hidden');
};
