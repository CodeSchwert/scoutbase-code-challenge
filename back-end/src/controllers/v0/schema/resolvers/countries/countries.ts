import { keys } from 'lodash';
import { continents, countries, languages } from 'countries-list';
import { Country } from './index.d';

const countryCodes: string[] = keys(countries);
const countryList: Country[] = [];

for (let countryCode of countryCodes) {
  // @ts-ignore
  const country = countries[countryCode];

  const { 
    code,
    name,
    native,
    phone,
    continent,
    capital,
    currency,
    // languages,
    emoji,
    emojiU 
  } = country;

  // const languageList = {}
  // for (let langCode of country.languages) {
  // }

  countryList.push({
    code: countryCode,
    name,
    native,
    phone: parseInt(phone),
    // @ts-ignore
    continent: { code: continent, name: continents[continent] },
    capital,
    currency,
    languages: [ { code: 'fo', name: 'Foo', native: 'Bar' } ],
    emoji,
    emojiU
  });
}

export default countryList;
