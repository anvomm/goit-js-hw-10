import refsList from './refs';

const refs = refsList();

export function stylizeOneCard() {
  const countryWrap = document.querySelector('.country__wrap');
  const properties = document.querySelectorAll('.country__property');

  refs.cardsList.style.display = 'none';
  refs.oneCardDiv.style.display = 'block';
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

export function stylizeListOfCountries() {
  refs.oneCardDiv.style.display = 'none';
  refs.cardsList.style.display = 'flex';
  refs.cardsList.style.flexDirection = 'column';
  refs.cardsList.style.gap = '10px';
  refs.cardsList.style.listStyle = 'none';
  refs.cardsList.style.margin = '0';
  refs.cardsList.style.paddingLeft = '0';
  [...refs.cardsList.children].forEach(child => {
    child.style.display = 'flex';
    child.style.alignItems = 'center';
    child.style.gap = '8px';
    child.lastElementChild.style.margin = '0';
    child.lastElementChild.style.fontSize = '20px';
  });
}
