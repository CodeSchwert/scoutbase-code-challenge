import { countries, languages } from 'countries-list';
import { Country } from './index.d';

export default function(alpha2Code: string): Country {
  // @ts-ignore
  const countryProps = countries[alpha2Code];

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

  const country: Country = {
    code: alpha2Code,
    name,
    native,
    phone: parseInt(phone),
    continent,
    capital,
    currency,
    emoji,
    emojiU,
    languages: languagesList
  };

  return country;
}
