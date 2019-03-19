import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Game from './views/Game';
import Landing from './views/Landing';

function App() {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition classNames="fade" timeout={1000} key={location.key}>
              <Switch location={location}>
                <Route exact path="/" render={props => <Landing {...props} />} />
                <Route path="/game/" render={props => <Game {...props} />} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>
  );
}

export default App;
