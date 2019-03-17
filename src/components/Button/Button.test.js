import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

it('calls function on button click', () => {
  const mockFn = jest.fn();
  const button = shallow(<Button onClick={mockFn} />);
  button.simulate('click');
  expect(mockFn).toBeCalled();
});

it('applies warning styling to button', () => {
  const wrapper = shallow(<Button type="warning" />);
  expect(wrapper.hasClass('hangman-btn-warning')).toBeTruthy();
});

it('applies success styling to button', () => {
  const wrapper = shallow(<Button type="success" />);
  expect(wrapper.hasClass('hangman-btn-success')).toBeTruthy();
});
