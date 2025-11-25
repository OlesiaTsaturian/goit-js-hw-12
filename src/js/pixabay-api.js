import axios from 'axios';

const API_KEY = '53395208-f197eaad794bdfcff5070dc5e';
const MAIN_URL = 'https://pixabay.com/api/';

export const getImagesByQuery = query => {
  return axios
    .get(MAIN_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
};
