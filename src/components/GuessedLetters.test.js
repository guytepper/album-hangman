import React from 'react';
import { mount } from 'enzyme';
import GuessedLetters from './GuessedLetters';

const guessedLetters = ['A', 'E', 'D'];
const wrapper = mount(<GuessedLetters letters={ guessedLetters }/>);

it('renders the guessed letters', () => {
  const letters = wrapper.find('.guessed-letter');
  letters.forEach((letter, index) => {
    expect(letter.text()).toEqual(guessedLetters[index]);
  }); 
});
