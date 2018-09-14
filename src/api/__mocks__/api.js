import albumInfo from './albumInfo.json';

function getAlbums(token) {
  return Promise.resolve(albumInfo);
}

export { getAlbums };
