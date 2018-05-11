import { isAlphabetical, isKeyCodeAlphabetical, getRandomInt, splitArrayWords } from './index';

it('detects if a string is alphabetical', () => {
  const alphabetical = 'A';
  const nonAlphabetical = '!';
  expect(isAlphabetical(alphabetical)).toBe(true);
  expect(isAlphabetical(nonAlphabetical)).toBe(false);
});

it('detects if a keycode is alphabetical', () => {
  const keyCode1 = 70;
  const keyCode2 = 150;
  expect(isKeyCodeAlphabetical(keyCode1)).toBe(true);
  expect(isKeyCodeAlphabetical(keyCode2)).toBe(false);
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
