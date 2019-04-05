import axios from 'axios';
import { shuffleArray, createConcealArr } from '../utils';
import removeDescriptors from 'album-name-normalizer';

function getAppleMusicAlbums(token, limit, offset) {
  const musicKit = window.MusicKit.getInstance();
  return musicKit.api.library.albums(null, { limit, offset });
}

function getSpotifyAlbums(token, limit, offset) {
  return axios.get('https://api.spotify.com/v1/me/albums', {
    params: { limit, offset },
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
}

/**
 * Change the API response to a flat array, containing objects with the album name & artwork image url.
 * e.g: [{ name: 'The White Album', image: 'urlgoeshere'}]
 * @param {string} service - Which service is being used - Spotify / Apple Music.
 * @param {array} response - The api response from the service.
 */
function normalizeServiceResponse(service, response) {
  if (service === 'spotify') {
    const itemsArrays = response.map(result => result.data.items); // Grab all data items from the response
    const items = itemsArrays.reduce((a, b) => a.concat(b), []); // Flatten the arrays to one array
    const albums = items.map(item => item.album); // Create new array from the album property of each item
    if (albums.length === 0) {
      throw new Error('No saved albums has been found.');
    }
    const formattedAlbums = albums.map(album => ({
      name: removeDescriptors(album.name),
      image: album.images[0].url
    }));
    return formattedAlbums;
  } else if (service === 'appleMusic') {
    const items = response.reduce((a, b) => a.concat(b), []); // Flatten the arrays to one array
    const albums = items.map(item => item.attributes); // Create new array from the attributes property of each item
    const formattedAlbums = albums.map(album => ({
      name: removeDescriptors(album.name),
      image: album.artwork.url.replace('{w}x{h}bb', '476x476bb')
    }));

    return formattedAlbums;
  }
}

/**
 * Filter out albums with long titles (more than 30 characters) / titles
 * without alphabetical characters.
 * @param {array} albums - Album objects array.
 * @returns {array} Albums array without problematic albums.
 */
function filterAlbums(albums) {
  return albums
    .filter(album => createConcealArr(album.name).indexOf('_') !== -1)
    .filter(album => album.name.length < 30);
}

/**
 * Get the user saved albums.
 * @param {string} service - The service being used (Spotify / Apple Music).
 * @param {string} token - The spotify user access token.
 * @returns {array} Array of the user saved albums, containing objects with the album name & image url.
 */
async function getAlbums(service, token) {
  try {
    const limit = 50;
    let promises = [];
    let getServiceAlbums = offset => getAppleMusicAlbums(null, limit, offset);

    if (service === 'spotify') {
      getServiceAlbums = offset => getSpotifyAlbums(token, limit, offset);
    }

    // Spotify limits each request to 50 albums, so we have to create multiple requests.
    // We'll take 1000 albums at most.
    for (let offset = 0; offset < 1000; offset += limit) {
      promises.push(getServiceAlbums(offset));
    }

    const results = await Promise.all(promises);
    const formattedAlbums = normalizeServiceResponse(service, results);
    const filteredAlbums = filterAlbums(formattedAlbums);
    return shuffleArray(filteredAlbums);
  } catch (err) {
    if (err.message) {
      throw new Error(err.message);
    } else if (err.response && err.response.data.error.message) {
      throw new Error(err.response.data.error.message);
    }
    throw new Error(err);
  }
}

export { getAlbums };
