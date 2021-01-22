import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '015e32c5635a052e5256ecc28f0df40f';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
  language: 'en-US',
};

function getMoviesTrending() {
  return axios('/trending/movie/day').then(response => response.data.results);
}

function searchMovies(query = '') {
  return axios('/search/movie', {
    params: {
      query,
      include_adult: false,
    },
  }).then(response => response.data.results);
}

function getMovieDetales(id) {
  return axios(`/movie/${id}`).then(response => response.data);
}

function getMovieCast(id) {
  return axios(`/movie/${id}/credits`).then(response => response.data);
}

function getMovieReviews(id) {
  return axios(`/movie/${id}/reviews`).then(response => response.data.results);
}

const apiServices = {
  getMoviesTrending,
  searchMovies,
  getMovieDetales,
  getMovieCast,
  getMovieReviews,
};

export default apiServices;
