import React from 'react';
import { shallow } from 'enzyme';
import Keyboard from './Keyboard';

const onPress = jest.fn(letter => null);
const wrapper = shallow(<Keyboard onPress={onPress} failedLetters={['Q', 'A']} guessedLetters={['Q', 'A', 'E']} />);

it('renders the keyboard successfuly', () => {
  expect(wrapper).toBeTruthy();
});

it('handles button press correctly', () => {
  wrapper
    .find('.keyboard-btn')
    .at(5)
    .simulate('click');
  expect(onPress).toBeCalled();
});

it('applies button class names correctly', () => {
  const failButton = wrapper.find('.keyboard-btn-letter').at(0); // 'Q'
  const successButton = wrapper.find('.keyboard-btn-letter').at(2); // 'E'

  expect(failButton.hasClass('keyboard-btn-fail')).toBeTruthy();
  expect(successButton.hasClass('keyboard-btn-success')).toBeTruthy();
});
