import {
  letterInWord,
  getIndiciesOfLetter,
  replaceUnderscore
} from './Logic'



it('checks if a letter exists in a word', () => {
  const letter = 'a';
  const word = 'abc';
  expect(letterInWord(letter, word)).toBe(true);
})

it('returns all indicies of letter in word', () => {
  const word = 'Hello, world!';
  const letter = 'o';
  const indicies = getIndiciesOfLetter(letter, word);

  expect(indicies).toEqual([4, 8]);
})

it('replaces underscores by letter according to indicies', () => {
  const underscoreArr = ['_', '_', '_', '_'];
  const letter = 'a';
  const indicies = [0, 3];

  expect(replaceUnderscore(underscoreArr, letter, indicies))
    .toEqual(['a', '_', '_', 'a'])
})
