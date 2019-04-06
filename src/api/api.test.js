import { privateMethods } from './api';

const { filterAlbums } = privateMethods;

it('filter albums correctly', () => {
  const albums = [{ name: 'OK Computer' }, { name: '23' }, { name: 'The Cure - Greatest Hits' }];
  const filteredAlbums = filterAlbums(albums);
  expect(filteredAlbums).toEqual([{ name: 'OK Computer' }]);
});
