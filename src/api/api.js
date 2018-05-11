import axios from 'axios';
import { getRandomInt } from '../utils';

/**
 * Get album information from the Last.FM API,
 * using the provided user information.
 */
async function getAlbum(username, period = 'overall') {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&period=${period}&api_key=3fe5c70aa486800a6cfdb759ccd3e213&format=json`;
  try {
    const response = await axios.get(url, { timeout: 8500 });

    if (response.data.error) throw new Error(response.data.message);
    const albumsArr = response.data.topalbums.album; // array of albums
    if (albumsArr.length === 0) throw new Error('No albums found for the time period');
    const album = albumsArr[getRandomInt(0, 50)];
    const name = album.name;
    const image = album.image[3]['#text'];

    return { album, name, image };
  } catch (err) {
    if (err.message.includes('timeout')) {
      throw new Error('Last.FM is taking too long to respond');
    }
    throw err;
  }
}

export { getAlbum };
