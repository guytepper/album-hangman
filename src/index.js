import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import App from './App';
import Landing from './components/Landing';
import './index.css';

ReactDOM.render(
  <Router>
    <div className='app'>
      <h1>Album Hangman</h1>
      <div className='container'>
        <Route exact path={'/'} component={Landing} />
        <Route path={'/game/:username'} component={App} />
      </div>
    </div>
  </Router>,
  document.getElementById('root')
);
