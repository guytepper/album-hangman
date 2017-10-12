import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game
     username="Dobida"
     period="overall"
     match={{
      params: {
        username: "avicooli",
        period: "overall",
        hideArtwork: "hard"
      }
    }}
  />, div);
});
//
//
// it('Hebrew listener renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Game username="yanmusic" period="12month" match={{ params: { username: "avicooli", period: "overall", hideArtwork: "hard" } }} />, div);
// });
//
// it('renders without artworks and without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Game username="avicooli" period="overall" hideArtwork={true} match={{params: { username: "avicooli", period: "overall", hideArtwork: "hard" } }}/>, div);
// });
