import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('updates setting value', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.state().username).toEqual('');
  wrapper.instance().updateSetting('username', 'Dobida');
  expect(wrapper.state().username).toEqual('Dobida');
});
