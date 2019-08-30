export interface Continent {
  code: string,
  name: string
}

export interface Country {
  code: string,
  name: string,
  native: string,
  phone: number,
  continent: Continent,
  capital: string,
  currency: string,
  languages: Language[],
  emoji: string,
  emojiU: string
}

export interface Language {
  code: string,
  name: string,
  native: string,
  rtl?: number;
}
