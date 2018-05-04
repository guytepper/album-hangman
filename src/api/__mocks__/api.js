import albumInfo from './albumInfo.json';

function getAlbum(username, period = 'overall') {
  return Promise.resolve(albumInfo);
}

export { getAlbum };
