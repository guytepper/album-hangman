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

const guessAlbumCorrectly = wrapper => {
  wrapper.instance().handleLetterPress('T');
  wrapper.instance().handleLetterPress('i');
  wrapper.instance().handleLetterPress('d');
  wrapper.instance().handleLetterPress('a');
  wrapper.instance().handleLetterPress('l');
};

const guessAlbumWrong = wrapper => {
  wrapper.instance().handleLetterPress('f');
  wrapper.instance().handleLetterPress('o');
  wrapper.instance().handleLetterPress('e');
  wrapper.instance().handleLetterPress('q');
};

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
  map.keydown({ key: 't' });
  expect(wrapper.state().currentGame.hiddenWord).toContain('T');
  // Wrongs guess
  map.keydown({ key: 'c' });
  expect(wrapper.state().currentGame.failedLetters).toContain('C');
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

it('shows success message', () => {
  guessAlbumCorrectly(mainWrapper);
  mainWrapper.update();

  expect(mainWrapper.exists('.game-status-msg')).toBeTruthy();
  expect(mainWrapper.text('Correct!')).toBeTruthy();
});

it('reveals album name on game lose', () => {
  mainWrapper.state().currentGame.revealHiddenWord = jest.fn();
  guessAlbumWrong(mainWrapper);

  expect(mainWrapper.state().currentGame.revealHiddenWord).toBeCalled();
  expect(
    mainWrapper
      .find('.hidden-word-letter')
      .at(0)
      .text()
  ).toEqual('T'); // 'Reveals the T letter of Tidal
});

it('calls correct new game methods after game lose', async () => {
  const wrapper = mount(
    <Game loading={true} totalAlbums={100} progress={0} moveFirstAlbumToArrayEnd={jest.fn()} error={null} />
  );

  jest.useFakeTimers();
  wrapper.setProps({ loading: false, nextAlbum: album });
  jest.runAllTimers();

  guessAlbumWrong(wrapper);
  wrapper.update();
  wrapper.instance().setNewAlbum = jest.fn();

  // TODO: Add new test for 'Next Album' button
  // wrapper
  //   .find('.button-wrapper')
  //   .at(0)
  //   .simulate('click'); // Click 'Next Album' button

  await wrapper.instance().startNewGame();
  expect(wrapper.prop('moveFirstAlbumToArrayEnd')).toBeCalled();
  expect(wrapper.instance().setNewAlbum).toBeCalled();
});

it('calls correct new game methods after game win', async () => {
  const map = {};
  window.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });

  const wrapper = mount(
    <Game loading={true} totalAlbums={100} progress={0} moveAlbumToGuessedArray={jest.fn()} error={null} />
  );

  jest.useFakeTimers();
  wrapper.setProps({ loading: false, nextAlbum: album });
  jest.runAllTimers();

  wrapper.instance().setNewAlbum = jest.fn();
  guessAlbumCorrectly(wrapper);
  wrapper.update();
  // TODO: Add new test for new game on enter click
  // map.keydown({ which: 13 }); // Clicks the enter key to start a new round
  await wrapper.instance().startNewGame();
  expect(wrapper.prop('moveAlbumToGuessedArray')).toBeCalled();
  expect(wrapper.instance().setNewAlbum).toBeCalled();
});

it('displays end modal on game end', () => {
  const wrapper = mount(<Game totalAlbums={100} progress={100} loading={true} resetGuessedAlbums={jest.fn()} />);
  jest.useFakeTimers();
  wrapper.setProps({ loading: false, nextAlbum: album });
  jest.runAllTimers();
  wrapper.update();

  expect(wrapper.exists('.end-modal')).toBeTruthy();
  wrapper
    .find('.hangman-btn-success')
    .at(0)
    .simulate('click'); // Clicks Play Again button
  expect(wrapper.prop('resetGuessedAlbums')).toBeCalled(); // Resets game progress
});

it('removes keydown listener on unmount', () => {
  const map = {};
  window.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });
  window.removeEventListener = jest.fn((event, cb) => {
    delete map[event];
  });

  const wrapper = mount(<Game loading={true} totalAlbums={100} progress={0} nextAlbum={null} error={null} />);
  expect(typeof map.keydown).toEqual('function');
  wrapper.unmount();
  expect('keydown' in map).toBeFalsy();
});

it('displays dying heart on failed guess', () => {
  // Wrong guess
  mainWrapper.instance().handleLetterPress('b');
  mainWrapper.update();
  expect(mainWrapper.find('.heart-grey')).toHaveLength(1);
});
