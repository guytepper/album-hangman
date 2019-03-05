import React, { Component } from 'react';
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
        <div className="landing-moving-albums" />
        <a className="service-login-button" onClick={this.selectSpotify}>
          <img alt="Spotify" src="/spotify.svg" className="service-button-logo" />
          <span>Connect with Spotify</span>
        </a>
        <a className="service-login-button" onClick={this.selectAppleMusic}>
          <img alt="Apple Music" src="/apple_music.png" className="service-button-logo" />
          <span>Connect with Apple Music</span>
        </a>
      </div>
    );
  }
}

export default Landing;
