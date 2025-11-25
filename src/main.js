import iziToast from 'izitoast';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';

const refs = {
  form: document.querySelector('.form'),
  searchGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.js-loader'),
};

const onSearchFormSubmit = event => {
  event.preventDefault();
  const { target: searchForm } = event;

  const userInput = searchForm.elements['search-text'].value.trim();

  if (userInput === '') {
    iziToast.error({
      message: 'Pleace enter what are you searching for',
      position: 'topRight',
    });
    return;
  }
  showLoader();

  getImagesByQuery(userInput)
    .then(data => {
      const { hits: imgArr } = data;

      if (imgArr.length === 0) {
        clearGallery();
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });

        return;
      }
      clearGallery();
      createGallery(imgArr);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(hideLoader);
  refs.form.reset();
};

refs.form.addEventListener('submit', onSearchFormSubmit);
