import { isAlphabetical, getRandomInt, splitArrayWords, shuffleArray } from './index';

it('detects if a string is alphabetical', () => {
  const alphabetical = 'A';
  const nonAlphabetical = '!';
  expect(isAlphabetical(alphabetical)).toBe(true);
  expect(isAlphabetical(nonAlphabetical)).toBe(false);
});

it('gets a random integer', () => {
  let num = getRandomInt(0, 20);
  expect(num).toBeGreaterThanOrEqual(0);
  expect(num).toBeLessThanOrEqual(20);
});

it('splits an array of words', () => {
  const words = ['H', 'e', 'y', ' ', 'm', 'a', 'n'];
  const wordsArr = splitArrayWords(words);
  expect(wordsArr).toEqual(['Hey', 'man']);
});

it('shuffles the array elements', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const shuffledArr = shuffleArray(arr);
  expect(shuffledArr).not.toEqual(arr);
});
