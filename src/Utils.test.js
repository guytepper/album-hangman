import {
  letterInWord,
  letterInArray,
  isAlphabetical,
  isKeyCodeAlphabetical,
  createUnderscoresArr,
  getIndiciesOfLetter,
  replaceUnderscores,
  getRandomInt
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

it('finds indicies of letters in a word', () => {
  const word = 'Hello World!';
  const letter = 'o';
  expect(getIndiciesOfLetter(word, letter)).toEqual([4, 7]);
});

it('checks if a letter is in a word', () => {
  const word = 'Hello World!';
  const letter1 = 'o';
  const letter2 = 'b';
  expect(letterInWord(word, letter1)).toBe(true);
  expect(letterInWord(word, letter2)).toBe(false);
})

it('checks if a letter is in an array', () => {
  const array = ['o', 'm', 'g'];
  const letter1 = 'o';
  const letter2 = 'b';
  expect(letterInArray(array, letter1)).toBe(true);
  expect(letterInArray(array, letter2)).toBe(false);
})

it('replaces underscores in the array with the supplied letter', () => {
  const underscoresArr = ['_', '_', '_', '_', '_'];
  const letter = 'o';
  const indicies = [2, 3];

  expect(replaceUnderscores(underscoresArr, letter, indicies)).toEqual([
    '_', '_', 'o', 'o', '_'
  ])
})

it('gets a random integer', () => {
  let num = getRandomInt(0, 20);
  expect(num).toBeGreaterThanOrEqual(0);
  expect(num).toBeLessThanOrEqual(20);
})
