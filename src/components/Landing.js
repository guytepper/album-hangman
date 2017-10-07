import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/buttons.css';
import './Landing.css';

class Landing extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: props.username || '',
      period: props.period || '12month',
      hideArtwork: props.hideArtwork
    };

    this.props = props;
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleLetsPlayButtonClick = this.handleLetsPlayButtonClick.bind(this);
    this.handleHideArtworkChange = this.handleHideArtworkChange.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  handlePeriodChange(event) {
    this.setState({
      period: event.target.value
    })
  }

  handleHideArtworkChange(event) {
    this.setState({
      hideArtwork: event.target.checked
    });
  }

  componentDidMount() {
    window.ga('set', 'page');
    window.ga('send', 'pageview', window.location.pathname);
  }

  handleLetsPlayButtonClick(e) {
    this.props.onSubmit({
      username: this.state.username,
      period: this.state.period,
      hideArtwork: this.state.hideArtwork
    });
  }

  render () {
    let dest = `/game/${this.state.username}/${this.state.period}`;
    if (this.state.hideArtwork) dest += '/hard';

    return (
      <form className='landing'>
        <input onChange={this.handleUsernameChange} value={this.state.username} className='landing-username' type='text' placeholder='Last.FM Username' autoFocus />

        <div className='game-option'>
          <u>Period</u>
          <label>
            <input type="radio" onChange={this.handlePeriodChange} name="period" className="pure-radio" value="12month" checked={this.state.period === '12month'} />
            12 Months
          </label>
          <label>
            <input type="radio" onChange={this.handlePeriodChange} name="period" className="pure-radio" value="6month" checked={this.state.period === '6month'}/>
            6 Months
          </label>
          <label>
            <input type="radio" onChange={this.handlePeriodChange} name="period" className="pure-radio" value="3month" checked={this.state.period === '3month'}/>
            3 Months
          </label>
          <label>
            <input type="radio" onChange={this.handlePeriodChange} name="period" className="pure-radio" value="1month" checked={this.state.period === '1month'}/>
            1 Month
          </label>
          <label>
            <input type="radio" onChange={this.handlePeriodChange} name="period" className="pure-radio" value="overall" checked={this.state.period === 'overall'}/>
            All Time
          </label>
        </div>

        <div className="game-option">
          <u>Advanced</u>
          <label>
            <input
              type="checkbox"
              onChange={this.handleHideArtworkChange}
              name="hideArtwork"
              checked={this.state.hideArtwork}
            />
            Hide Artwork
          </label>
        </div>
        <Link to={dest} onClick={this.handleLetsPlayButtonClick} style={!this.state.username ? {pointerEvents: "none"} : null}>
          <button className='button-success pure-button' disabled={!this.state.username}>Let's play! <span role="img" aria-label="Clown">🤡</span></button>
        </Link>
      </form>
    )
  }
}

export default Landing;
