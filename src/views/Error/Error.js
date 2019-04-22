import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import './Error.css';

const errorDetail = 'Spotify is providing only albums you saved in full - not invidual songs.';

function Error({ message }) {
  let showDetail = false;

  if (message === 'No saved albums has been found.') {
    showDetail = true;
  }

  return (
    <div className="error-container">
      <h1 className="error-message">{message}</h1>
      {showDetail ? (
        <div className="error-detail">
          <span>{errorDetail}</span>
        </div>
      ) : null}
      <Link to="/">
        <Button type="warning">Try again?</Button>
      </Link>
    </div>
  );
}

export default Error;
