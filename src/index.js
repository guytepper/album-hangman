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
    <div>
      
      <Route path={'/'} component={Landing} />
      <Router path={'/game/:username'} component={App} />
    </div>
  </Router>
  ,
  document.getElementById('root')
);
