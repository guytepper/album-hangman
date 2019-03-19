import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Game from './views/Game';
import Landing from './views/Landing';

window.addEventListener('touchstart', function onFirstTouch() {
  document.body.classList.add('user-is-touching');
});

function App() {
  const [service, setService] = useState('none');

  return (
    <Router>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition classNames="fade" timeout={1000} key={location.key}>
              <Switch location={location}>
                <Route
                  exact
                  path="/"
                  render={props => <Landing {...props} selectService={service => setService(service)} />}
                />
                <Route path="/game/" render={props => <Game {...props} service={service} />} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>
  );
}

export default App;
