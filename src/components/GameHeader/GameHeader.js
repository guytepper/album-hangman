import React from 'react';
import Hearts from '../../components/Hearts';
import ProgressBar from '../../components/Progress';
import './GameHeader.css';

function GameHeader(props) {
  return (
    <div className="game-top-bar">
      <Hearts lives={4 - props.currentGame.failedGuesses} />
      <ProgressBar type="thin" total={152} progress={53} />
      <div className="game-top-bar-settings-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25">
          <g fill="none" fill-rule="evenodd">
            <circle cx="12.5" cy="12.5" r="12.5" fill="#000" />
            <g stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 5)">
              <circle className="settings-icon-gear" cx="7.721" cy="7.721" r="1.985" />
              <path
                className="settings-icon-gear"
                d="M12.545 9.545c-.185.421-.096.913.225 1.241l.041.041a1.364 1.364 0 1 1-1.93 1.93l-.04-.041A1.125 1.125 0 0 0 9.6 12.49c-.412.177-.68.581-.682 1.03v.115a1.364 1.364 0 1 1-2.727 0v-.061a1.125 1.125 0 0 0-.736-1.03 1.125 1.125 0 0 0-1.241.225l-.041.041a1.364 1.364 0 1 1-1.93-1.93l.041-.04c.322-.329.41-.82.225-1.241a1.125 1.125 0 0 0-1.03-.682h-.115a1.364 1.364 0 0 1 0-2.727h.061c.462-.01.87-.303 1.03-.736.185-.421.096-.913-.225-1.241l-.041-.041a1.364 1.364 0 1 1 1.93-1.93l.04.041c.329.322.82.41 1.241.225h.055c.412-.177.68-.581.681-1.03v-.115a1.364 1.364 0 1 1 2.728 0v.061c.001.448.27.853.681 1.03.421.185.913.096 1.241-.225l.041-.041a1.364 1.364 0 1 1 1.93 1.93l-.041.04c-.322.329-.41.82-.225 1.241v.055c.177.412.581.68 1.03.681h.115a1.364 1.364 0 1 1 0 2.728h-.061c-.448.001-.853.27-1.03.681z"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default GameHeader;
