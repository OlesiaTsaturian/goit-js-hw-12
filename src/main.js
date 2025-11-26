import iziToast from 'izitoast';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';

const refs = {
  form: document.querySelector('.form'),
  searchGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.js-loader'),
  loadMoreBtn: document.querySelector('.load-btn-js'),
};

let currentPage = 1;
let currentQuery = '';

const onSearchFormSubmit = async event => {
  event.preventDefault();
  hideLoadMoreButton();

  const { target: searchForm } = event;

  const userInput = searchForm.elements['search-text'].value.trim();

  if (userInput === '') {
    iziToast.error({
      message: 'Pleace enter what are you searching for',
      position: 'topRight',
    });
    return;
  }
  currentQuery = userInput;
  currentPage = 1;

  showLoader();

  const { hits, totalHits } = await getImagesByQuery(currentQuery, currentPage);

  try {
    if (hits.length === 0) {
      clearGallery();
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoadMoreButton();
      return;
    }
    clearGallery();
    createGallery(hits);
    showLoadMoreButton();
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
    refs.form.reset();
  }
};

const onLoadBtnClick = async () => {
  currentPage += 1;
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(
      currentQuery,
      currentPage
    );
    createGallery(hits);

    if (currentPage * 15 >= totalHits) {
      iziToast.error({
        message: "Were sorry, but you've reached the end of search results",
        position: 'topRight',
      });
      hideLoadMoreButton();
    }
    const firstCard = refs.searchGallery.firstElementChild;
    const cardRect = firstCard.getBoundingClientRect();
    const cardHeight = cardRect.height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
};

refs.form.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadBtnClick);
