const express = require('express');
const cloudinary = require('cloudinary');
const config = require('./config');

const app = express();
const port = 8000;

cloudinary.config(config.cloudinaryCreds);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/image-upload', (req, res) => {
  console.log('Uploading images...');
  let values = Object.values(req.files);

  if (Array.isArray(values[0])) {
    values = values[0];
  }

  console.log(values);

  const promises = values.map((image) => cloudinary.uploader.upload(image.path));

  Promise
    .all(promises)
    .then((results) => res.json(results));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
