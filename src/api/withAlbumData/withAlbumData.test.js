import React from 'react';
import { mount } from 'enzyme';
import withAlbumData from './withAlbumData';

const pendingAlbums = [{ name: 'Tidal', image: 'https://i.scdn.co/image/51364027ac7cc159f317daa8c64aae36f74e6fb8' }];
const guessedAlbums = [{ name: 'Blonde', image: 'https://i.scdn.co/image/e22f959dae6f088b9c6614c4f777efacaf3544f1' }];

localStorage.setItem('pendingAlbums', JSON.stringify(pendingAlbums));
localStorage.setItem('guessedAlbums', JSON.stringify(guessedAlbums));
localStorage.setItem('service', 'cache');

const DummyComponent = () => true;
const Component = withAlbumData(DummyComponent);
const wrapper = mount(<Component />);

it('loads albums from cache', () => {
  const { totalAlbums, pendingAlbums: pendingState, guessedAlbums: guessedState } = wrapper.state();

  expect(totalAlbums).toEqual(2);
  expect(pendingState).toEqual(pendingAlbums);
  expect(guessedState).toEqual(guessedAlbums);
});
