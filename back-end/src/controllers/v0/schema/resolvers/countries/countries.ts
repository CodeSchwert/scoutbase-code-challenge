import { keys } from 'lodash';
import { continents, countries, languages } from 'countries-list';
import { Country } from './index.d';

const countryCodes: string[] = keys(countries);
const countryList: Country[] = [];

for (let countryCode of countryCodes) {
  // @ts-ignore
  const countryProps = countries[countryCode];

  const {
    name,
    native,
    phone,
    continent,
    capital,
    currency,
    emoji,
    emojiU 
  } = countryProps;

  const languagesList = [];

  for (let lang of countryProps.languages) {
    // @ts-ignore
    const language = languages[lang];
    language.code = lang;
    languagesList.push(language);
  }

  countryList.push({
    code: countryCode,
    name,
    native,
    phone: parseInt(phone),
    // @ts-ignore
    continent: { code: continent, name: continents[continent] },
    capital,
    currency,
    languages: languagesList,
    emoji,
    emojiU
  });
}

export default countryList;
