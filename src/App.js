import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Game from './views/Game';
import Landing from './views/Landing';

function App() {
  return (
    <Router>
      <React.Fragment>
        <Route exact path="/" render={props => <Landing {...props} />} />
        <Route path="/game/" render={props => <Game {...props} />} />
      </React.Fragment>
    </Router>
  );
}

export default App;
