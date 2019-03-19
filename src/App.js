import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Game from './views/Game';
import Landing from './views/Landing';

window.addEventListener('touchstart', function onFirstTouch() {
  document.body.classList.add('user-is-touching');
});

function App() {
  const [service, setService] = useState('none');

  return (
    <Router>
      <React.Fragment>
        <Route exact path="/" render={props => <Landing {...props} selectService={service => setService(service)} />} />
        <Route path="/game/" render={props => <Game {...props} service={service} />} />
      </React.Fragment>
    </Router>
  );
}

export default App;
