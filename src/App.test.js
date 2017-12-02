import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('updates setting value', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.state().username).toEqual('');
  expect(wrapper.state().period).toEqual('12month');
  expect(wrapper.state().hideArtwork).toEqual(false);

  wrapper.instance().updateSetting('username', 'Dobida');
  wrapper.instance().updateSetting('period', 'overall');
  wrapper.instance().updateSetting('hideArtwork', true);

  expect(wrapper.state().username).toEqual('Dobida');
  expect(wrapper.state().period).toEqual('overall');
  expect(wrapper.state().hideArtwork).toEqual(true);
});
