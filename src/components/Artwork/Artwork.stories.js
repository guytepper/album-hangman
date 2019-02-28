import React from 'react';
import { storiesOf } from '@storybook/react';
import Artwork from './Artwork.js';
import artwork from './sample-artwork.jpg';

storiesOf('Artwork', module).add('blurred', () => <Artwork blurLevel={4} img={artwork} />);
storiesOf('Artwork', module).add('clear', () => <Artwork blurLevel={0} img={artwork} />);
