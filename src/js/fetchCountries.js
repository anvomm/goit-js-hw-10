const URL = 'https://restcountries.com/v2/name/';
const FILTERED_FIELDS = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${URL}${name}?${FILTERED_FIELDS}`).then(response => {
    if (response.status === 404) return Promise.reject();
    return response.json();
  });
}
