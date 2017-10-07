import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import {
  BrowserRouter as Router,
  Route,
  matchPath
} from 'react-router-dom'

import Game from './components/Game';
import Landing from './components/Landing';
import './index.css';

const GAME_PATH = '/game/:username?/:period?';

class App extends Component{
  constructor(props){
    super(props);

    // Match current path to keep username and period in state
    const history = createHistory();
    this.match = matchPath(history.location.pathname,
      { path: GAME_PATH });
    this.state = {
      username: this.match ? this.match.params.username : '',
      period: this.match ? this.match.params.period : ''
    }
  }

  render(){
    return (<Router>
      <div className='app'>
        <h1>Album Hangman</h1>
        <div className='container'>
          <Route
            exact path={'/'}
            component={props=>
              <Landing
                username={this.state.username}
                period={this.state.period}
                {...props}
              />
            }
          />
          <Route
            path={GAME_PATH}
            component={props=>
              <Game
                username={this.state.username}
                period={this.state.period}
                {...props}
              />
            }
          />
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
