import React from 'react';
import { shallow } from 'enzyme';
import Game from './Game';

jest.mock('../../api');

it('renders without crashing', () => {
  const wrapper = shallow(<Game username="Dobida" period="overall" hideArtwork={false} />);
  process.nextTick(() => console.log(wrapper.state()));
});

// it('Hebrew listener renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(
//     <App
//       match={{
//         params:
//           username: 'yanmusic',
//           period: '12month'
//         }
//       }}
//     />,
//     div
//   );
// });

// // Change to test that it renders without artwork
// it('renders without artworks and without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(
//     <App
//       match={{
//         params: {
//           username: 'avicooli',
//           period: 'overall'
//         }
//       }}
//     />,
//     div
//   );
// });

// // Test that renders route with params
