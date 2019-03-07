import React from 'react';
import Hearts from '../../components/Hearts';
import ProgressBar from '../../components/Progress';

function GameHeader(props) {
  return (
    <div className="game-top-bar">
      <Hearts lives={4 - props.currentGame.failedGuesses} />
      <ProgressBar type="thin" total={152} progress={53} />
      <img src="/settings.svg" className="game-top-bar-settings-icon" />
    </div>
  );
}

export default GameHeader;
