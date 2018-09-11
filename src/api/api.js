import axios from 'axios';

/**
 * Get the user saved albums.
 * @param {string} token - The spotify user access token.
 * @returns {array} Array of the user saved albums, containing objects with the album name & image url.
 */
async function getAlbums(token) {
  try {
    const { data } = await axios.get('https://api.spotify.com/v1/me/albums', {
      params: { limit: 50 },
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    const albums = data.items.map(item => item.album);
    const formattedAlbums = albums.map(album => ({ name: album.name, image: album.images[0] }));
    return formattedAlbums;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export { getAlbums };
