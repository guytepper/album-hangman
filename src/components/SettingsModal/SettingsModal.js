import React from 'react';
import Modal from '../Modal';
import Button from '../Button';
import './SettingsModal.css';

function SettingsModal({ resetGameProgress, setSettingsDisplay }) {
  return (
    <Modal>
    <Modal className="settings-modal">
      <span className="settings-modal-text">
        Your progress is being saved - you'll be able to continue playing later if you'll close the window.
      </span>
      <div className="settings-modal-buttons">
        <Button type="warning" onClick={resetGameProgress}>
          Reset Progress
        </Button>
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
    </Modal>
  );
}

export default SettingsModal;
