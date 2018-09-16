import axios from 'axios';
import removeDescriptors from 'album-name-normalizer';

function getSpotifyAlbums(token, limit, offset) {
  return axios.get('https://api.spotify.com/v1/me/albums', {
    params: { limit, offset },
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
}

/**
 * Get the user saved albums.
 * @param {string} token - The spotify user access token.
 * @returns {array} Array of the user saved albums, containing objects with the album name & image url.
 */
async function getAlbums(token) {
  try {
    const limit = 50;
    let promises = [];

    // Spotify limits each request to 50 albums, so we have to create multiple requests.
    // We'll take 1000 albums at most.
    for (let offset = 0; offset < 1000; offset += limit) {
      promises.push(getSpotifyAlbums(token, limit, offset));
    }

    const results = await Promise.all(promises);
    const itemsArrays = results.map(result => result.data.items); // Grab all data items from the results
    const items = itemsArrays.reduce((a, b) => a.concat(b), []); // Flatten the arrays to one array
    const albums = items.map(item => item.album); // Create new array from the album property of each item
    const formattedAlbums = albums.map(album => ({ name: removeDescriptors(album.name), image: album.images[0].url }));
    return formattedAlbums;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export { getAlbums };
