import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/buttons.css';
import './Landing.css';

class Landing extends React.Component {
    constructor () {
      super();
      this.state = {
        username: ''      
      };

      this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    handleUsernameChange(event) {
      this.setState({
        username: event.target.value
      })
    }

    render () {
      return (
        <form className='landing'>
          <input onChange={this.handleUsernameChange} value={this.state.username} className='landing-username' type='text' placeholder='Last.FM Username' autoFocus />

          <div className='landing-period'>            
            <label>
              <input type="radio" name="period" className="pure-radio" value="12 Month" checked />
              12 Months
            </label>
            <label>
              <input type="radio" name="period" className="pure-radio" value="6 Month" />
              6 Months
            </label>
            <label>
              <input type="radio" name="period" className="pure-radio" value="6 Month" />
              3 Months
            </label>
            <label>
              <input type="radio" name="period" className="pure-radio" value="6 Month" />
              1 Month
            </label>
            <label>
              <input type="radio" name="period" className="pure-radio" value="6 Month" />
              All Time
            </label>
          </div>

          <Link to={`/game/${this.state.username}`}>
            <button className='landing-btn button-success pure-button'>Let's play! 🤡</button>
          </Link>
        </form>
      )
    }
}

export default Landing;