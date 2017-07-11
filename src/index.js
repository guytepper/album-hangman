import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
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
        <Route path={'/game/:username/:period?'} component={App} />
      </div>
      <footer>
        <a href='https://github.com/guytepper/album-hangman'>
          <img src='/github.svg' alt='View on GitHub' className='github-icon' />
        </a>      
      </footer>
    </div>
  </Router>,
  document.getElementById('root')
);
