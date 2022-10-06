export function renderOneCard(array) {
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

export function renderManyCards(array) {
  return array
    .map(country => {
      const {
        flags: { svg },
        name,
      } = country;
      return `<li><img alt="${name} flag" width=30 height=30 src="${svg}"/><p>${name}</p></li>`;
    })
    .join('');
}
