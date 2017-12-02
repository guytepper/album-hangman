import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Game from './views/Game';
import Landing from './views/Landing';

class App extends Component {
  state = {
    username: '',
    period: '12month',
    hideArtwork: false
  };

  updateSetting = (prop, val) => {
    this.setState({ [prop]: val });
  };

  render() {
    return (
      <Router>
        <div className="app">
          <h1>Album Hangman</h1>
          <div className="container">
            <Route
              exact
              path="/"
              render={props => (
                <Landing {...props} {...this.state} updateSetting={this.updateSetting} />
              )}
            />
            <Route
              path="/game/:username/:period?/"
              render={props => <Game {...props} {...this.state} />}
            />
          </div>
          <footer>
            <a href="https://github.com/guytepper/album-hangman">
              <img src="/github.svg" alt="View on GitHub" className="github-icon" />
            </a>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
