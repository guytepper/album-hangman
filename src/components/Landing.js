import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/buttons.css';
import './Landing.css';

class Landing extends React.Component {
  constructor (props) {

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
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
  // Wrap change hanlder to keep parent code as independent as possible
  handleChange = event => {
    this.props.onSettingUpated(`${event.target.name}`,
       event.target.name === 'hideArtwork' ? event.target.checked :  event.target.value);
  }

  componentDidMount() {
    window.ga('set', 'page');
    window.ga('send', 'pageview', window.location.pathname);
  }

  render () {
    let dest = `/game/${this.props.username}/${this.props.period}`;
    if (this.props.hideArtwork) dest += '/hard';

    return (
      <form className='landing'>
        <input name="username" onChange={this.handleChange} value={this.props.username} className='landing-username' type='text' placeholder='Last.FM Username' autoFocus />

        <div className='game-option'>
          <u>Period</u>
          <label>
            <input type="radio" onChange={this.handleChange} name="period" className="pure-radio" value="12month" checked={this.props.period === '12month'} />
            12 Months
          </label>
          <label>
            <input type="radio" onChange={this.handleChange} name="period" className="pure-radio" value="6month" checked={this.props.period === '6month'}/>
            6 Months
          </label>
          <label>
            <input type="radio" onChange={this.handleChange} name="period" className="pure-radio" value="3month" checked={this.props.period === '3month'}/>
            3 Months
          </label>
          <label>
            <input type="radio" onChange={this.handleChange} name="period" className="pure-radio" value="1month" checked={this.props.period === '1month'}/>
            1 Month
          </label>
          <label>
            <input type="radio" onChange={this.handleChange} name="period" className="pure-radio" value="overall" checked={this.props.period === 'overall'}/>
            All Time
          </label>
        </div>

        <div className="game-option">
          <u>Advanced</u>
          <label>
            <input
              type="checkbox"
              onChange={this.handleChange}
              name="hideArtwork"
              checked={this.props.hideArtwork}
            />
            Hide Artwork
          </label>
        </div>
        <Link to={dest} style={!this.props.username ? {pointerEvents: "none"} : null}>
          <button className='button-success pure-button' disabled={!this.props.username}>Let's play! <span role="img" aria-label="Clown">🤡</span></button>
        </Link>
      </form>
    )
  }
}

export default Landing;
