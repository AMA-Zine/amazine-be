const { createClient } = require('pexels');

const client = createClient('563492ad6f91700001000001f93de67d145a4dcb9dd99e86878021b2');

const getPhotosArray = async(query) => {
  const response = await client.photos.search({ query, orientation: 'landscape', per_page: 10 });

  const urlArray = response.photos.map(photo => {
    return photo.src.large;
  });

  const randomUrl = urlArray[Math.floor(Math.random() * urlArray.length)];

  return randomUrl;
};

module.exports = getPhotosArray;
// getPhotosArray();
