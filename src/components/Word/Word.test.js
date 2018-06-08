import React from 'react';
import { mount } from 'enzyme';
import Word from './Word';

const hiddenLettersArr = ['H', '_', ' ', '_', '_', '_'];
const wrapper = mount(<Word hiddenLetters={hiddenLettersArr} />);

it('renders the letters correctly', () => {
  expect(wrapper.find('.hidden-word').length).toEqual(2);
  expect(wrapper.find('.hidden-word-letter').length).toEqual(5);
});
