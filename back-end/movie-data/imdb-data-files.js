/**
 * IMDB datasets: https://datasets.imdbws.com
 * Documentation: https://www.imdb.com/interfaces/
 */
const imdbDataFiles = [
  {
    url: 'https://datasets.imdbws.com/name.basics.tsv.gz',
    filename: 'name.basics.tsv'
  },
  // {
  //   url: 'https://datasets.imdbws.com/title.akas.tsv.gz',
  //   filename: 'title.akas.tsv'
  // },
  {
    url: 'https://datasets.imdbws.com/title.basics.tsv.gz',
    filename: 'title.basics.tsv'
  },
  // {
  //   url: 'https://datasets.imdbws.com/title.crew.tsv.gz',
  //   filename: 'title.crew.tsv'
  // },
  // {
  //   url: 'https://datasets.imdbws.com/title.episode.tsv.gz',
  //   filename: 'title.episode.tsv'
  // },
  {
    url: 'https://datasets.imdbws.com/title.principals.tsv.gz',
    filename: 'title.principals.tsv'
  },
  // {
  //   url: 'https://datasets.imdbws.com/title.ratings.tsv.gz',
  //   filename: 'title.ratings.tsv'
  // }
];

module.exports = imdbDataFiles;
