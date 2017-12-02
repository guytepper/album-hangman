import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/buttons.css';
import './Landing.css';

function Landing(props) {
  return (
    <form className="landing">
      <input
        onChange={e => props.updateSetting('username', e.target.value)}
        value={props.username}
        className="landing-username"
        type="text"
        placeholder="Last.FM Username"
        autoFocus
      />
      <div className="game-option">
        <u>Period</u>
        <label>
          <input
            type="radio"
            onChange={e => props.updateSetting('period', e.target.value)}
            name="period"
            className="game-option-radio"
            value="12month"
            checked={props.period === '12month'}
          />
          12 Months
        </label>
        <label>
          <input
            type="radio"
            onChange={e => props.updateSetting('period', e.target.value)}
            name="period"
            className="game-option-radio"
            value="6month"
            checked={props.period === '6month'}
          />
          6 Months
        </label>
        <label>
          <input
            type="radio"
            onChange={e => props.updateSetting('period', e.target.value)}
            name="period"
            className="game-option-radio"
            value="3month"
            checked={props.period === '3month'}
          />
          3 Months
        </label>
        <label>
          <input
            type="radio"
            onChange={e => props.updateSetting('period', e.target.value)}
            name="period"
            className="game-option-radio"
            value="1month"
            checked={props.period === '1month'}
          />
          1 Month
        </label>
        <label>
          <input
            type="radio"
            onChange={e => props.updateSetting('period', e.target.value)}
            name="period"
            className="game-option-radio"
            value="overall"
            checked={props.period === 'overall'}
          />
          All Time
        </label>
      </div>
      <div className="game-option">
        <u>Advanced</u>
        <label className>
          <input
            type="checkbox"
            className="game-option-checkbox"
            onChange={e => props.updateSetting('hideArtwork', e.target.checked)}
            name="hideArtwork"
            checked={props.hideArtwork}
          />
          Hide Artwork
        </label>
      </div>
      <Link to={`/game/${props.username}/${props.period}`}>
        <button className="button-success pure-button" disabled={!props.username}>
          Let's play!&nbsp;
          <span role="img" aria-label="Clown">
            🤡
          </span>
        </button>
      </Link>
    </form>
  );
}

export default Landing;
