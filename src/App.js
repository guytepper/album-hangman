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
      </React.Fragment>
    </Router>
  );
}

export default App;
