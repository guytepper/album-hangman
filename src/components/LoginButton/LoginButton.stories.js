import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import LoginButton from './LoginButton';

storiesOf('Login Button', module).add('spotify', () => <LoginButton type="Spotify" icon="/spotify.svg" />);
storiesOf('Login Button', module).add('apple music', () => <LoginButton type="Apple Music" icon="/apple_music.png" />);
