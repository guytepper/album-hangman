import React from 'react';
import { mount } from 'enzyme';
import { Game } from './Game';
import { BrowserRouter as Router } from 'react-router-dom';

const album = {
  name: 'Tidal',
  image: 'https://i.scdn.co/image/51364027ac7cc159f317daa8c64aae36f74e6fb8'
};

let mainWrapper = null;

beforeAll(() => {
  mainWrapper = mount(<Game loading={true} totalAlbums={100} progress={0} nextAlbum={null} error={null} />);
  jest.useFakeTimers();
  mainWrapper.setProps({ loading: false, nextAlbum: album });
  jest.runAllTimers();

  // Enzyme not noticing changes caused by external circumstances (setState inside a timeout)
  mainWrapper.update();
});

beforeEach(() => {
  mainWrapper.instance().setNewAlbum();
});

it('renders loading component', () => {
  const wrapper = mount(<Game loading={true} />);
  expect(wrapper.text('Loading...')).toBeTruthy();
});

it('renders new album correctly', () => {
  expect(mainWrapper.state().currentAlbum).toEqual(album);
  expect(mainWrapper.find('.game-stage')).toHaveLength(1);
});

it('handles key press correctly', () => {
  const map = {};
  window.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });

  // Mocking the event listener on beforeAll make issues with this test, so instead we'll mount the component
  // and mock the event listener here.
  const wrapper = mount(<Game loading={true} totalAlbums={100} progress={0} nextAlbum={null} error={null} />);
  jest.useFakeTimers();
  wrapper.setProps({ loading: false, nextAlbum: album });
  jest.runAllTimers();

  // Click the 't' key
  map.keydown({ which: 84 });
  expect(wrapper.state().currentGame.hiddenWord).toContain('T');
});

it('handles letter press correctly', () => {
  mainWrapper
    .find('.keyboard-btn')
    .at(4)
    .simulate('click');

  expect(mainWrapper.state().currentGame.hiddenWord).toContain('T');
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

  const wrapper = mount(<Game resetGuessedAlbums={fn} loading={false} totalAlbums={100} progress={5} />);
  wrapper.instance().resetGameProgress();
  expect(fn).toBeCalled();
});

it('displays settings modal on gear icon click', () => {
  mainWrapper.find('.game-top-bar-settings-icon').simulate('click');

  expect(mainWrapper.exists('.modal')).toBeTruthy();
  expect(mainWrapper.state().displaySettings).toBeTruthy();
});

it('displays end modal on game end', () => {
  const wrapper = mount(<Game totalAlbums={100} progress={100} loading={true} />);
  jest.useFakeTimers();
  wrapper.setProps({ loading: false, nextAlbum: album });
  jest.runAllTimers();
  wrapper.update();

  expect(wrapper.exists('.end-modal')).toBeTruthy();
});
