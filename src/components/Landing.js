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
          <Link to={`/game/${this.state.username}`}>
            <button className='landing-btn button-success pure-button'>Let's play! 🤡</button>
          </Link>
        </form>
      )
    }
}

export default Landing;