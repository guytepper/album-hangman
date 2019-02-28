import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Keyboard from './Keyboard.js';

storiesOf('Keyboard', module).add('naked', () => (
  <Keyboard failedLetters={[]} guessedLetters={[]} gameStatus={'IN_PROGRESS'} onPress={action('clicked')} />
));

storiesOf('Keyboard', module).add('fail and success', () => (
  <Keyboard failedLetters={['G']} guessedLetters={['S']} gameStatus={'IN_PROGRESS'} onPress={action('clicked')} />
));
