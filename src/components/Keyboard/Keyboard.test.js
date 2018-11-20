import React from 'react';
import { shallow } from 'enzyme';
import Keyboard from './Keyboard';

const onPress = jest.fn(letter => null);
const wrapper = shallow(<Keyboard onPress={onPress} failedLetters={['A', 'B']} guessedLetters={['A', 'B', 'C']} />);

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
