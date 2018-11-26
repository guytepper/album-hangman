import React, { Component } from 'react';
import './Landing.css';

class Landing extends Component {
  selectSpotify = () => {
    this.props.selectService('spotify');
    window.open(
      'https://accounts.spotify.com/authorize?client_id=b50c5fa3329f4d1cb16d82142c82654c&response_type=token&scope=user-library-read&redirect_uri=http://localhost:3000/game/',
      '_self'
    );
  };

  selectAppleMusic = () => {
    this.props.selectService('appleMusic');
    window.MusicKit.configure({
    });
    const musicKit = window.MusicKit.getInstance();
    musicKit.authorize().then(() => {
      this.props.history.push('/game/');
    });
  };

  render() {
    return (
      <div className="landing">
        <h1 className="landing-header">Album Hangman</h1>
        <p>Can you guess your favorite Spotify albums?</p>
        <a onClick={this.selectSpotify} className="spotify-button">
          <img alt="Spotify" src="/spotify.svg" className="spotify-button-logo" />
          <span>Connect with Spotify</span>
        </a>
        <a className="spotify-button" onClick={this.selectAppleMusic}>
          <img alt="Apple Music" src="/apple_music.png" className="spotify-button-logo" />
          <span>Connect with Apple Music</span>
        </a>
      </div>
    );
  }
}

export default Landing;
