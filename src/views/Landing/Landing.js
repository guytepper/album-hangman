import React, { useState } from 'react';
import LoginButton from '../../components/LoginButton';
import { getSavedAlbums } from '../../utils';
import './Landing.css';

let spotifyRedirectURL = 'http://localhost:3000/game/';
if (process.env.NODE_ENV === 'production') {
  spotifyRedirectURL = 'https://album-hangman.com/game/';
}

function selectSpotify(selectService) {
  selectService('spotify');
  window.open(
    `https://accounts.spotify.com/authorize?client_id=${
      process.env.REACT_APP_SPOTIFY_ID
    }&response_type=token&scope=user-library-read&redirect_uri=${spotifyRedirectURL}`,
    '_self'
  );
}

function selectAppleMusic(selectService, history) {
  selectService('appleMusic');
  window.MusicKit.configure({
    developerToken: process.env.REACT_APP_MUSICKIT_TOKEN,
    app: {
      name: 'Album Hangman',
      build: '2018.29.11'
    }
  });
  const musicKit = window.MusicKit.getInstance();
  musicKit.authorize().then(() => {
    history.push('/game/');
  });
}

function Landing(props) {
  const [hasProgress, setHasProgress] = useState(false);
  const [pendingAlbums] = getSavedAlbums();
  if (pendingAlbums.length > 0) {
    setHasProgress(true);
  }

  return (
    <div className="landing">
      <h1 className="landing-header">Do you really know your music?</h1>
      <div className="landing-moving-albums">
        <img
          className="landing-moving-albums-image"
          src="./albums-carousel2.jpg"
          alt="Blurred Album Artworks Carousel"
        />
      </div>
      <div className="landing-game-info">
        <div className="landing-description">
          <p className="bold-text">
            We all know Hangman. It’s a classic game. But let’s see if you can beat it with your own music taste.
          </p>
          <p>
            Each round a blurred album artwork from your music library will be displayed: would you be able to guess the
            name of the album?
          </p>
        </div>
        <div className="login-buttons">
          {hasProgress ? (
            <React.Fragment>
              <LoginButton type="Spotify" icon="/spotify.svg" onClick={() => selectSpotify(props.selectService)} />
              <LoginButton
                type="Apple Music"
                icon="/apple_music.png"
                onClick={() => selectAppleMusic(props.selectService, props.history)}
              />
            </React.Fragment>
          ) : (
            <span>HAS PROGRESS!</span>
          )}
        </div>
      </div>
      <footer className="landing-footer">
        <span className="landing-footer-created">
          Created by <span className="landing-footer-created-name">Guy Tepper</span>
        </span>
        <span>
          Fork me on{' '}
          <a
            className="landing-footer-github-link"
            target="_blank"
            href="https://github.com/guytepper/album-hangman"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </span>
      </footer>
    </div>
  );
}

export default Landing;
