import { languages } from 'countries-list';
import { Language } from './index.d';

export default function(langCode: string): Language {
  // @ts-ignore
  const { name, native, rtl } = languages[langCode];

  return {
    code: langCode,
    name,
    native,
    rtl
  };
}
