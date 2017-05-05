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
          <input onChange={this.handleUsernameChange} value={this.state.username} type='text' placeholder='Last.FM Username' />
          <Link to={`/game/${this.state.username}`}>
            <button>Let's play 🤡</button>
          </Link>
        </div>
      )
    }
}

export default Landing;