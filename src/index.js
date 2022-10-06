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
  if (arr.length > 10) {
    searchResultClean();
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (arr.length === 1) {
    searchResultClean();
    refs.oneCardDiv.insertAdjacentHTML('beforeend', renderOneCard(arr));
    makeOneCardStyle();
  } else {
    searchResultClean();
    refs.cardsList.insertAdjacentHTML('beforeend', renderManyCards(arr));
    makeListOfCountriesStyle();
  }
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
  return `<div class="country__wrap"><img alt="${name} flag" width=30 height=30 src="${svg}"/><h2 class="country__name">${name}</h2></div><ul class="country__list"><li><span class="country__property">Capital:</span> ${capital}</li><li><span class="country__property">Population:</span> ${population}</li><li><span class="country__property">Languages:</span> ${languagesList}</li></ul>`;
}

function renderManyCards(array) {
  return array.map(country => {
    const {
      flags: { svg },
      name,
    } = country;
    return `<li><img alt="${name} flag" width=30 height=30 src="${svg}"/><h2>${name}</h2></li>`;
  });
}

function searchResultClean() {
  refs.oneCardDiv.innerHTML = '';
  refs.cardsList.innerHTML = '';
}

function makeOneCardStyle() {
  const countryWrap = document.querySelector('.country__wrap');
  const properties = document.querySelectorAll('.country__property');

  refs.cardsList.style.display = 'none';

  countryWrap.style.display = 'flex';
  countryWrap.style.alignItems = 'center';
  countryWrap.style.gap = '10px';
  countryWrap.lastElementChild.style.margin = '0';
  countryWrap.lastElementChild.style.fontSize = '30px';
  countryWrap.nextElementSibling.style.listStyle = 'none';
  countryWrap.nextElementSibling.style.paddingLeft = '0';
  countryWrap.nextElementSibling.style.display = 'flex';
  countryWrap.nextElementSibling.style.flexDirection = 'column';
  countryWrap.nextElementSibling.style.gap = '10px';
  properties.forEach(property => (property.style.fontWeight = '700'));
}

function makeListOfCountriesStyle() {
  refs.cardsList.style.display = 'block';
}
