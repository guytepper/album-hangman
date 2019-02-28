import React from 'react';
import { storiesOf } from '@storybook/react';
import Word from './Word.js';

storiesOf('Word', module).add('sample', () => <Word hiddenLetters={['B', 'l', 'o', 'n', 'd', 'e']} />);
