import { continents } from 'countries-list';
import { Continent } from './index.d';

export default function(contCode: string): Continent {
  // @ts-ignore
  const continent = continents[contCode];

  return { code: contCode, name: continent || '' };
}
