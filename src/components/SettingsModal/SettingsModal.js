import React from 'react';
import Button from '../Button';
import './SettingsModal.css';

function SettingsModal({ className, setSettingsDisplay, resetProgress }) {
  return (
    <div className={`settings-modal ${className}`}>
      <div className="settings-modal-buttons">
        <Button type="warning" onClick={resetProgress}>
          Reset Progress
        </Button>
        <Button type="warning">Logout</Button>
        <Button type="success" onClick={() => setSettingsDisplay(false)}>
          Close
        </Button>
      </div>
      <div className="settings-modal-credits">
        <span className="settings-modal-credits-name">Created by Guy Tepper</span>
        <span className="settings-modal-credits-github">
          Fork on{' '}
          <a target="_blank" href="https://github.com/guytepper/album-hangman" rel="noopener noreferrer">
            Github
          </a>
        </span>
      </div>
    </div>
  );
}

export default SettingsModal;
