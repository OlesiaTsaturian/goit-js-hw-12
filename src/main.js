import iziToast from 'izitoast';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import { PER_PAGE, getImagesByQuery } from './js/pixabay-api';

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
  try {
    const { hits, totalHits } = await getImagesByQuery(
      currentQuery,
      currentPage
    );

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

    if (currentPage * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "Were sorry, but you've reached the end of search results",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
    // showLoadMoreButton();
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

    if (hits.length === 0) {
      hideLoadMoreButton();
      return;
    }
    createGallery(hits);

    if (currentPage * PER_PAGE >= totalHits) {
      iziToast.info({
        message: "Were sorry, but you've reached the end of search results",
        position: 'topRight',
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
    const сard = refs.searchGallery.firstElementChild;
    const cardRect = сard.getBoundingClientRect();
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
