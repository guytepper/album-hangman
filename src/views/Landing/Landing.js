import React, { useState, useEffect, useRef } from 'react';
import LoginButton from '../../components/LoginButton';
import { getSavedAlbums, deleteSavedAlbums } from '../../utils';
import './Landing.css';

let spotifyRedirectURL = 'http://localhost:3000/game/';
if (process.env.NODE_ENV === 'production') {
  spotifyRedirectURL = 'https://album-hangman.com/game/';
}

function selectSpotify(selectService) {
  localStorage.setItem('service', 'spotify');
  window.open(
    `https://accounts.spotify.com/authorize?client_id=${
      process.env.REACT_APP_SPOTIFY_ID
    }&response_type=token&scope=user-library-read&redirect_uri=${spotifyRedirectURL}`,
    '_self'
  );
}

function selectAppleMusic(selectService, history) {
  localStorage.setItem('service', 'appleMusic');
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
  const imageElm = useRef(null);
  const [hasProgress, setHasProgress] = useState(false);
  const [pendingAlbums] = getSavedAlbums();

  useEffect(() => {
    localStorage.setItem('service', 'none');
  }, []);

  useEffect(() => {
    if (pendingAlbums.length > 0) {
      setHasProgress(true);
    }
  });

  /* Safari (both iOS & OS X) doesn't display the image correctly on initial launch. 
     Loading the image using JavaScript fixes the issue. */
  useEffect(() => {
    const albumsImage = new Image();
    albumsImage.onload = function() {
      imageElm.current.src = albumsImage.src;
      imageElm.current.className = 'landing-moving-albums-image';
    };
    albumsImage.src = './albums-carousel2.jpg';
  }, []);

  return (
    <div className="landing">
      <h1 className="landing-header">Do you really know your music?</h1>
      <div className="landing-moving-albums">
        <img ref={imageElm} alt="Blurred Album Artworks Carousel" />
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
              <LoginButton
                text="Continue Playing"
                icon="/refresh.svg"
                onClick={() => {
                  localStorage.setItem('service', 'cache');
                  props.history.push('/game/');
                }}
              />
              <LoginButton
                text="Delete Progress"
                icon="/delete.svg"
                onClick={() => {
                  if (window.confirm('Do you really want to delete your progress?')) {
                    deleteSavedAlbums();
                    setHasProgress(false);
                  }
                }}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <LoginButton
                text="Connect with Spotify"
                icon="/spotify.svg"
                onClick={() => selectSpotify(props.selectService)}
              />
              <LoginButton
                text="Connect with Apple Music"
                icon="/apple_music.png"
                onClick={() => selectAppleMusic(props.selectService, props.history)}
              />
            </React.Fragment>
          )}
        </div>
      </div>
      <footer className="landing-footer">
        <span className="landing-footer-created">
          Created by{' '}
          <a className="landing-footer-github-link" href="mailto:guytepper@gmail.com">
            Guy Tepper
          </a>
        </span>
        <span>
          Fork on{' '}
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
