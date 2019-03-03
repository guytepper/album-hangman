import React from 'react';
import { shallow } from 'enzyme';
import Progress from './Progress';

it('shows the progress bar precentage correctly', () => {
  const progress = shallow(<Progress total={100} progress={10} />);
  expect(progress.find('.progress-bar').prop('style')).toHaveProperty('width', '10%');
});

it('shows the thin progress bar', () => {
  const progress = shallow(<Progress total={100} progress={10} type={'thin'} />);
  console.log(progress.html());
  expect(progress.find('.progress-thin-label')).toHaveLength(1);
  expect(progress.find('.progress-thin')).toHaveLength(2);
});
