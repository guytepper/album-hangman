import React from 'react';
import './Landing.css';

function Landing(props) {
  return (
    <div className="landing">
      <h1 className="landing-header">Album Hangman</h1>
      <p>Can you guess your favorite Spotify albums?</p>
      <a onClick={() => props.selectService('spotify')} className="spotify-button">
        <img alt="Spotify" src="/spotify.svg" className="spotify-button-logo" />
        <span>Connect with Spotify</span>
      </a>
      <a className="spotify-button" onClick={() => props.selectService('appleMusic')}>
        <span>Connect with Apple Music</span>
      </a>
    </div>
  );
}

export default Landing;
