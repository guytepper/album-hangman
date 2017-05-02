import React from 'react'

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
          <button>Let's play 🤡</button>
        </div>
      )
    }
}

export default Landing;