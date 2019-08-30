import { keys } from 'lodash';
import { continents } from 'countries-list';
import { Continent } from './index.d';

const continentCodes: string[] = keys(continents);
const continentList: Continent[] = [];

for (let code of continentCodes) {
  // @ts-ignore
  const name: string = continents[code];
  continentList.push({ code, name });
}

export default continentList;
