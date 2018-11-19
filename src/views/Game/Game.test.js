import React from 'react';
import { shallow } from 'enzyme';
import Game from './Game';

jest.mock('../../api');

it.skip('renders without crashing', () => {
  const wrapper = shallow(<Game location={{ hash: 'okay' }} />);
  process.nextTick(() => {
    const { currentAlbum } = wrapper.state();
    expect(currentAlbum).toMatchObject({
      name: expect.any(String),
      image: expect.any(String)
    });
  });
});
