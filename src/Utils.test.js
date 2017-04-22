import {
  isAlphabetical,
  createUnderscoresArr
} from './Utils';

it('detects if a string is alphabetical', () => {
  const alphabetical = 'A';
  const nonAlphabetical = '!';
  expect(isAlphabetical(alphabetical)).toBe(true);
  expect(isAlphabetical(nonAlphabetical)).toBe(false);
})

it('create an array of underscored according to album name', () => {
  const albumName = 'On Hold';
  expect(createUnderscoresArr([...albumName])).toEqual([
    '_',
    '_',
    ' ',
    '_',
    '_',
    '_',
    '_'
  ])
})
