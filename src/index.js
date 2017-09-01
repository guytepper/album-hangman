import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import App from './App';
import Landing from './components/Landing';
import './index.css';

ReactDOM.render(
  <Router>
    <div className='app'>
      <h1>Album Hangman</h1>
      <div className='container'>
        <Switch>
          <Route path={'/game/:username/:period?/:isHardMode?'} component={App} />
          <Route path={'/:username?/:period?/:isHardMode?'} component={Landing} />
        </Switch>
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
