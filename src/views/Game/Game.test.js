import React from 'react';
import { mount } from 'enzyme';
import { Game } from './Game';
import { BrowserRouter as Router } from 'react-router-dom';
import { process } from 'ipaddr.js';

const album = {
  name: 'Tidal',
  image: 'https://i.scdn.co/image/51364027ac7cc159f317daa8c64aae36f74e6fb8'
};

it('renders loading component', () => {
  const wrapper = mount(<Game loading={true} />);
  expect(wrapper.text('Loading...')).toBeTruthy();
});

it('renders new album correctly', () => {
  const wrapper = mount(<Game loading={true} totalAlbums={100} progress={0} nextAlbum={null} error={null} />);

  jest.useFakeTimers();
  wrapper.setProps({ loading: false, nextAlbum: album });
  jest.runAllTimers();

  // Enzyme not noticing changes caused by external circumstances (setState inside a timeout)
  wrapper.update();
  expect(wrapper.state().currentAlbum).toEqual(album);
  expect(wrapper.find('.game-stage')).toHaveLength(1);
});

it('handles key press correctly', () => {
  // Mock the global event listener
  const map = {};
  window.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });

  const wrapper = mount(<Game loading={true} totalAlbums={100} progress={0} nextAlbum={null} error={null} />);

  jest.useFakeTimers();
  wrapper.setProps({ loading: false, nextAlbum: album });
  jest.runAllTimers();

  // Click the 't' key
  map.keydown({ which: 84 });

  expect(wrapper.state().currentGame.hiddenWord).toContain('T');
});

it('handles letter press correctly', () => {
  const wrapper = mount(<Game loading={true} totalAlbums={100} progress={0} nextAlbum={null} error={null} />);

  jest.useFakeTimers();
  wrapper.setProps({ loading: false, nextAlbum: album });
  jest.runAllTimers();
  wrapper.update();

  wrapper
    .find('.keyboard-btn')
    .at(4)
    .simulate('click');

  expect(wrapper.state().currentGame.hiddenWord).toContain('T');
});

it('displays error component correctly', () => {
  // Wrapping in
  const wrapper = mount(
    <Router>
      <Game error={'Session token has expired'} />
    </Router>
  );

  expect(wrapper.exists('.error-container')).toBeTruthy();
});

it('calls reset game progress method successfuly', () => {
  window.confirm = jest.fn(() => true);
  window.alert = jest.fn();
  const fn = jest.fn();

it('displays settings modal on gear icon click', () => {});
