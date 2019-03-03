import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Progress from './Progress';

storiesOf('Progress', module).add('standard', () => <Progress total={152} progress={33} />);
storiesOf('Progress', module).add('thin', () => <Progress total={152} progress={33} type="thin" />);
