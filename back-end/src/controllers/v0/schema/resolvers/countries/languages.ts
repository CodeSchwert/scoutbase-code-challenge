import { keys } from 'lodash';
import { languages } from 'countries-list';
import { Language } from './index.d';

const languageCodes: string[] = keys(languages);
const languageList: Language[] = [];

for (let langCode of languageCodes) {
  // @ts-ignore
  const { name, native, rtl }: Language = languages[langCode];

  const language: Language = {
    code: langCode,
    name, 
    native
  };

  if (rtl) {
    language.rtl = rtl
  }

  languageList.push(language);
}

export default languageList;
