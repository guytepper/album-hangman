import React from 'react';
import { mount } from 'enzyme';
import Hearts from './Hearts';

const wrapper = mount(<Hearts lives={3} />);

it('renders hearts according to lives', () => {
  expect(wrapper.find('.heart-grey').length).toEqual(1);
});
