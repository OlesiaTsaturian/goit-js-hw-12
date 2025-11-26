import axios from 'axios';

const API_KEY = '53395208-f197eaad794bdfcff5070dc5e';
const BASE_URL = 'https://pixabay.com/api/';

export const getImagesByQuery = async (query, page) => {
  const requestParams = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };

  const response = await axios.get(BASE_URL, {
    params: requestParams,
  });
  const { data } = response;
  return data;

  // .then(response => response.data);
};
