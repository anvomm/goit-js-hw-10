import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import refsList from './js/refs';

const debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = refsList();

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(evt) {
  fetchCountries(evt.target.value.trim()).then(data => validateData(data));
}

function validateData(arr) {
  if (arr.length > 10)
    Notify.info('Too many matches found. Please enter a more specific name.');
  if (arr.length === 1)
    refs.oneCardDiv.insertAdjacentHTML('beforeend', renderOneCard(arr));
}

function renderOneCard(array) {
  const {
    flags: { svg },
    name,
    capital,
    population,
    languages,
  } = array[0];
  const languagesList = languages.map(language => language.name).join(', ');
  return `<img alt="${name} flag" width=30 height=30 src="${svg}"/><h2>${name}</h2><ul><li>Capital: ${capital}</li><li>Population: ${population}</li><li>Languages: ${languagesList}</li></ul>`;
}
