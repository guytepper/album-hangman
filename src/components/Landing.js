import React from 'react'
import { Link } from 'react-router-dom';

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
        <div>
          <h1>Album Hangman</h1>
          <input onChange={this.handleUsernameChange} value={this.state.username} type='text' placeholder='Last.FM Username' />
          <Link to="/game/Dobida">
            asd
          </Link>
          <button>Let's play 🤡</button>
        </div>
      )
    }
}

export default Landing;