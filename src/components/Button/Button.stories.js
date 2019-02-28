import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button.js';

storiesOf('Button', module).add('with text', () => <Button>Hello Button</Button>);
storiesOf('Button', module).add('loading', () => <Button loading={true}>Hello Button</Button>);
