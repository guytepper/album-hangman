import { getIndiciesOfLetter } from './Logic'

it('returns all indicies of letter in word', () => {
  const word = 'Hello, world!';
  const letter = 'o';
  const indicies = getIndiciesOfLetter(letter, word);

  expect(indicies).toEqual([4, 8]);
})
