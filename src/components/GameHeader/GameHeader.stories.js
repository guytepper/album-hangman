import React from 'react';
import { storiesOf } from '@storybook/react';
import GameHeader from './GameHeader.js';

const currentGame = {
  failedGuesses: 0
};

storiesOf('GameHeader', module).add('default', () => (
  <GameHeader currentGame={currentGame} totalAlbums={152} albumsProgress={43} />
));
