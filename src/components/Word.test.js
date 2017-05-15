import React from 'react';
import { mount } from 'enzyme';
import Word from './Word';

const hiddenLettersArr = ['_', 'U', '_', '_', '_', '_']
const wrapper = mount(<Word hiddenLetters={ hiddenLettersArr} />);

it('recives hidden letters prop correctly', () => {
  expect(wrapper.props().hiddenLetters).toEqual(hiddenLettersArr);
});

it('renders the letters correctly', () => {
  expect(wrapper.text()).toEqual('_U____');
});

