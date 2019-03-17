import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button.js';

storiesOf('Button', module).add('success', () => <Button type="success">Okay</Button>);
storiesOf('Button', module).add('warning', () => <Button type="warning">Reset Progress</Button>);
