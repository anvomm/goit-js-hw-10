import '../css/styles.css';
import { fetchCountries } from './fetchCountries';
import refsList from './refs';
import { stylizeOneCard, stylizeListOfCountries } from './resultsStylization';
import { renderOneCard, renderManyCards } from './renderMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const refs = refsList();

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(evt) {
  searchResultClean();
  if (evt.target.value === '' || evt.target.value.match(/^\s+$/)) return;
  fetchCountries(evt.target.value.trim())
    .then(handleSearchResults)
    .catch(Notify.failure('"Oops, there is no country with that name"'));
}

function handleSearchResults(arr) {
  if (arr.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (arr.length === 1) {
    refs.oneCardDiv.insertAdjacentHTML('beforeend', renderOneCard(arr));
    stylizeOneCard();
  } else {
    refs.cardsList.insertAdjacentHTML('beforeend', renderManyCards(arr));
    stylizeListOfCountries();
  }
}

function searchResultClean() {
  refs.oneCardDiv.innerHTML = '';
  refs.cardsList.innerHTML = '';
}
