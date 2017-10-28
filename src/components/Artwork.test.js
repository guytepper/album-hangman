import React from 'react';
import { mount } from 'enzyme';
import Artwork from './Artwork';

const artworkUrl = 'https://lastfm-img2.akamaized.net/i/u/300x300/e7de85bfdb014125851c7fec9c105c6e.png';
const blurLevel = 3;
const gameEnd = false;

const wrapper = mount(<Artwork albumImg={artworkUrl} blurLevel={blurLevel} gameEnd={gameEnd} />);
const artwork = wrapper.find('img').get(0);

it('renders blurred artwork', () => {
  expect(artwork.style.filter).toEqual('blur(3px)');
});

it('displays the artwork unblurred when the game ends', () => {
  wrapper.setProps({ gameEnd: true });
  expect(artwork.style.filter).toEqual('blur(0px)');
});
