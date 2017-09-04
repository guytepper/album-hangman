import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App match={{
    params: {
      username: 'Dobida',
      period: 'overall'
    }
  }}/>, div);
});


it('Hebrew listener renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App match={{
    params: {
      username: 'yanmusic',
      period: '12month'
    }
  }}/>, div);
});
