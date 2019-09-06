const request = require('request');
const zlib = require('zlib');
const fs = require('fs');
const imdbDataFiles = require('./imdb-data-files');

const progress = {
  totalBytes: 0,
  receivedBytes: 0
};

const showProgress = () => {
  const { totalBytes, receivedBytes } = progress;

  const totalMB = parseFloat((totalBytes / 1000) / 1000).toFixed(2);
  const receivedMB = parseFloat((receivedBytes / 1000) / 1000).toFixed(2);
  process.stdout.write(
    `Total Downloads (Compressed): ${receivedMB} / ${totalMB} MB \r`
  );

  if (receivedBytes == totalBytes) {
    console.log(/* newline */);
  }
};

for (let dataset of imdbDataFiles) {
    const { url, filename } = dataset;
    const out = fs.createWriteStream(filename);

    console.log(`Downloading ${filename}`);
    request(url)
      .on('error', (err) => {
        console.error(err);
      })
      .on('response', (data) => {
        progress.totalBytes += parseInt(data.headers['content-length']);
      })
      .on('data', (chunk) => {
        progress.receivedBytes += chunk.length;
        showProgress();
      })
      .pipe(zlib.createGunzip())
      .pipe(out);
}
