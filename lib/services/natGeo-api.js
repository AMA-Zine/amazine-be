/* eslint-disable max-len */
const fetch = require('node-fetch');

const getNatGeo = async() => {
  const newerDate = new Date();

  const response = await fetch(`https://www.nationalgeographic.com/content/photography/en_US/photo-of-the-day/_jcr_content/.gallery.${newerDate.getFullYear()}-${newerDate.getMonth() + 1}.json`)
    .then(res => res.json())
    .then(json => {
      return json.items[0];
    });

  return response;
};

module.exports = getNatGeo;
