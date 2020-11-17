const { createClient } = require('pexels');
require('dotenv').config();

const client = createClient(process.env.API_KEY);

// need query from flair
// need to extract imageurl and store in db
//don't forget to remove console.logs when done
const query = 'Science-Live';

const getPhotosArray = async() => {
    const response = await client.photos.search({ query, per_page: 10 });

    const urlArray = response.photos.map(photo => {
        return photo.url;
    });

    console.log(urlArray);

    let randomUrl = urlArray[Math.floor(Math.random() * urlArray.length)];

    console.log(randomUrl);

    return randomUrl;
};

// getPhotosArray();