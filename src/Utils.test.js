import {
  isAlphabetical,
  isKeyCodeAlphabetical,
  createUnderscoresArr
} from './Utils';

it('detects if a string is alphabetical', () => {
  const alphabetical = 'A';
  const nonAlphabetical = '!';
  expect(isAlphabetical(alphabetical)).toBe(true);
  expect(isAlphabetical(nonAlphabetical)).toBe(false);
})

it('detects if a keycode is alphabetical', () => {
  const keyCode1 = 70;
  const keyCode2 = 150;
  expect(isKeyCodeAlphabetical(keyCode1)).toBe(true);
  expect(isKeyCodeAlphabetical(keyCode2)).toBe(false);
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
