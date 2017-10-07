import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Game from './components/Game';
import Landing from './components/Landing';
import './index.css';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      username: "",
      period: ""
    }
  }

  render(){
    return (<Router>
      <div className='app'>
        <h1>Album Hangman</h1>
        <div className='container'>
          <Route exact path={'/'} component={Landing} />
          <Route path={'/game/:username/:period?'} component={Game} />
        </div>
        <footer>
          <a href='https://github.com/guytepper/album-hangman'>
            <img src='/github.svg' alt='View on GitHub' className='github-icon' />
          </a>
        </footer>
      </div>
    </Router>);
  }
}

ReactDOM.render(<App/>,  document.getElementById('root'));
