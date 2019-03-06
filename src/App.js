import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Game from './views/Game';
import Landing from './views/Landing';

function App() {
  const [service, setService] = useState('spotify');

  return (
    <Router>
      <React.Fragment>
        <Route exact path="/" render={props => <Landing {...props} selectService={service => setService(service)} />} />
        <Route path="/game/" render={props => <Game {...props} service={service} />} />
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

export default App;
