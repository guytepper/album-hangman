import React, { Component } from 'react';
import LoginButton from '../../components/LoginButton';
import './Landing.css';

let spotifyRedirectURL = 'http://localhost:3000/game/';
if (process.env.NODE_ENV === 'production') {
  spotifyRedirectURL = 'https://album-hangman.com/game/';
}

class Landing extends Component {
  selectSpotify = () => {
    this.props.selectService('spotify');
    window.open(
      `https://accounts.spotify.com/authorize?client_id=${
        process.env.REACT_APP_SPOTIFY_ID
      }&response_type=token&scope=user-library-read&redirect_uri=${spotifyRedirectURL}`,
      '_self'
    );
  };

  selectAppleMusic = () => {
    this.props.selectService('appleMusic');
    window.MusicKit.configure({
      developerToken: process.env.REACT_APP_MUSICKIT_TOKEN,
      app: {
        name: 'Album Hangman',
        build: '2018.29.11'
      }
    });
    const musicKit = window.MusicKit.getInstance();
    musicKit.authorize().then(() => {
      this.props.history.push('/game/');
    });
  };

  render() {
    return (
      <div className="landing">
        <h1 className="landing-header">Do you really know your music?</h1>
        <div className="landing-moving-albums">
          <img className="landing-moving-albums-image" src="./albums-carousel1.jpg" />
        </div>
        <div className="landing-game-info">
          <div className="landing-description">
            <p className="bold-text">
              We all know Hangman. It’s a classic game. But let’s see if you can beat it with your own music taste.
            </p>
            <p>
              Each round a blurred album artwork from your music library would be displayed: <br />
              will you be able to guess the name of the album?
            </p>
          </div>
          <div className="login-buttons">
            <LoginButton type="Spotify" icon="/spotify.svg" onClick={this.selectSpotify} />
            <LoginButton type="Apple Music" icon="/apple_music.png" onClick={this.selectAppleMusic} />
          </div>
        </div>
        <footer className="landing-footer">
          <span className="landing-footer-created">
            Created by <span className="landing-footer-created-name">Guy Tepper</span>
          </span>
          <span>
            Contribute on{' '}
            <a className="landing-footer-github-link" href="https://github.com/guytepper/album-hangman">
              Github
            </a>
          </span>
        </footer>
      </div>
    );
  }
}

export default Landing;
