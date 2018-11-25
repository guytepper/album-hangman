import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Game from './views/Game';
import Landing from './views/Landing';

class App extends Component {
  state = {
    service: 'spotify'
  };

  selectService = service => {
    if (service === 'spotify') {
      window.open(
        'https://accounts.spotify.com/authorize?client_id=b50c5fa3329f4d1cb16d82142c82654c&response_type=token&scope=user-library-read&redirect_uri=http://localhost:3000/game/',
        '_self'
      );
    }
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <Route
            exact
            path="/"
            render={props => <Landing {...props} {...this.state} selectService={this.selectService} />}
          />
          <Route path="/game/" render={props => <Game {...props} {...this.state} />} />
          <a
            href="https://github.com/guytepper/album-hangman"
            style={{ display: 'flex', justifyContent: 'center', margin: '20px', opacity: 0.5 }}
          >
            <img src="/github.svg" alt="GitHub" width="30" height="30" />
          </a>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
