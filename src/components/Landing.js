import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/buttons.css';
import './Landing.css';

class Landing extends React.Component {
    constructor () {
      super();
      this.state = {
        username: '',
        period: '12month'     
      };

      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handlePeriodChange = this.handlePeriodChange.bind(this);
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

    render () {
      return (
        <form className='landing'>
          <input onChange={this.handleUsernameChange} value={this.state.username} className='landing-username' type='text' placeholder='Last.FM Username' autoFocus />

          <div className='landing-period'>            
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

          <Link to={`/game/${this.state.username}`}>
            <button className='landing-btn button-success pure-button'>Let's play! 🤡</button>
          </Link>
        </form>
      )
    }
}

export default Landing;