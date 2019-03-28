import React from 'react';
import { mount } from 'enzyme';
import { Game } from './Game';

const album = {
  name: 'Tidal',
  image: 'https://i.scdn.co/image/51364027ac7cc159f317daa8c64aae36f74e6fb8'
};

it('renders loading component', () => {
  const wrapper = mount(<Game loading={true} />);
  expect(wrapper.text('Loading...')).toBeTruthy();
});

it('renders new album correctly', done => {
  const wrapper = mount(<Game loading={true} totalAlbums={100} progress={0} nextAlbum={null} error={null} />);

  jest.useFakeTimers();
  wrapper.setProps({ loading: false, nextAlbum: album });
  jest.runAllTimers();

  process.nextTick(() => {
    // Enzyme not noticing changes caused by external circumstances (setState inside a timeout)
    wrapper.update();
    expect(wrapper.state().currentAlbum).toEqual(album);
    expect(wrapper.find('.game-stage')).toHaveLength(1);
    done();
  });
});
