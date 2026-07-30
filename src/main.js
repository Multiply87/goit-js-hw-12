import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getImagesByQuery from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

let lastQuery = '';
let page = 1;
const PER_PAGE = 15;
let totalPages = 0;

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('#load-more');

loadMoreButton.addEventListener('click', loadMore);

form.addEventListener('submit', async event => {
  event.preventDefault();

  const searchQuery = event.target.elements['search-text'].value.trim();

  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  lastQuery = searchQuery;
  page = 1;
  totalPages = 0;

  clearGallery();
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(searchQuery, 1, PER_PAGE);
    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalPages = Math.ceil(data.totalHits / PER_PAGE);
    createGallery(data.hits);

    checkLastPage();
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while fetching images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    event.target.reset();
  }
});

function checkLastPage() {
  if (page >= totalPages) {
    hideLoadMoreButton();
    iziToast.warning({
      title: 'Warning',
      message: `We're sorry, but you've reached the end of search results.`,
      position: 'topRight',
    });    
  } else {
    showLoadMoreButton();    
  }
}

async function loadMore() {  
  page++;
  try {
    showLoader();
    hideLoadMoreButton();
    const data = await getImagesByQuery(lastQuery, page, PER_PAGE);
    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    showLoadMoreButton();
    scrollBy();
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while fetching images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    checkLastPage();
  }
}

function scrollBy() {
  const { height } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();
  window.scrollBy({
    top: 2 * height,
    behavior: 'smooth',
  });
}
