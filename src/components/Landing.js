import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/buttons.css';
import './Landing.css';

class Landing extends React.Component {
  constructor({ match }) {
    super();

    let _period = !match.params.period ? "12month" : match.params.period;
    let _hideArtwork = match.params.hideArtwork === "true";
    this.state = {
      username: match.params.username,
      period: _period,
      hideArtwork: _hideArtwork
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleHideArtworkChange = this.handleHideArtworkChange.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePeriodChange(event) {
    this.setState({
      period: event.target.value
    });
  }

  handleHideArtworkChange(event) {
    this.setState({
      hideArtwork: event.target.value
    });
  }

  componentDidMount() {
    window.ga('set', 'page');
    window.ga('send', 'pageview', window.location.pathname);
  }

  render() {
    return (
      <form className="landing">
        <input
          onChange={this.handleUsernameChange}
          value={this.state.username}
          className="landing-username"
          type="text"
          placeholder="Last.FM Username"
          autoFocus
        />

        <div className='landing-period'>
          <u>Period</u>
          <label>
            <input
              type="radio"
              onChange={this.handlePeriodChange}
              name="period"
              className="pure-radio"
              value="12month"
              checked={this.state.period === "12month"}
            />
            12 Months
          </label>
          <label>
            <input
              type="radio"
              onChange={this.handlePeriodChange}
              name="period"
              className="pure-radio"
              value="6month"
              checked={this.state.period === "6month"}
            />
            6 Months
          </label>
          <label>
            <input
              type="radio"
              onChange={this.handlePeriodChange}
              name="period"
              className="pure-radio"
              value="3month"
              checked={this.state.period === "3month"}
            />
            3 Months
          </label>
          <label>
            <input
              type="radio"
              onChange={this.handlePeriodChange}
              name="period"
              className="pure-radio"
              value="1month"
              checked={this.state.period === "1month"}
            />
            1 Month
          </label>
          <label>
            <input
              type="radio"
              onChange={this.handlePeriodChange}
              name="period"
              className="pure-radio"
              value="overall"
              checked={this.state.period === "overall"}
            />
            All Time
          </label>
        </div>

        <div className="landing-advanced-options">
          <u>Advanced</u>
          <label>
            <input
              type="checkbox"
              onChange={this.handleHideArtworkChange}
              name="hideArtwork"
              defaultChecked={this.state.hideArtwork}
            />
            Hide Artwork
          </label>
        </div>

        <Link
          to={`/game/${this.state.username}/${this.state.period}/${this.state
            .hideArtwork
            ? "hard"
            : ""}`}
          style={!this.state.username ? { pointerEvents: "none" } : null}
        >
          <button
            className="button-success pure-button"
            disabled={!this.state.username}
          >
            Let's play!
            <span role="img" aria-label="Clown">
              🤡
            </span>
          </button>
        </Link>
      </form>
    );
  }
}

export default Landing;
