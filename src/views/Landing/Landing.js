import React from 'react';
import './Landing.css';

function Landing(props) {
  return (
    <div className="landing">
      <h1 className="landing-header">Album Hangman</h1>
      <p>Can you guess your favorite Spotify albums?</p>
      <a
        className="spotify-button"
        href="https://accounts.spotify.com/authorize?client_id=b50c5fa3329f4d1cb16d82142c82654c&response_type=token&scope=user-library-read&redirect_uri=http://localhost:3000/game/"
      >
        <img alt="Spotify" src="/spotify.svg" className="spotify-button-logo" />
        <span>Connect with Spotify</span>
      </a>
    </div>
  );
}

export default Landing;
