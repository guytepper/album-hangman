import React from 'react'

const wordStyle = {
  letterSpacing: '3px'
};


class Word extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <h1 style={ wordStyle }>
        { this.props.hiddenLetters }
      </h1>
    );
  }
}

export default Word;
