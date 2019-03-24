import React from 'react';
import Modal from '../Modal';
import Button from '../Button';

function SettingsModal({ resetGameProgress, setSettingsDisplay }) {
  return (
    <Modal className="settings-overlay">
      <div className="settings-modal-buttons">
        <Button type="warning" onClick={resetGameProgress}>
          Reset Progress
        </Button>
        <Button type="warning">Logout</Button>
        <Button type="success" onClick={() => setSettingsDisplay(false)}>
          Close
        </Button>
      </div>
      <div className="settings-modal-credits">
        <span className="settings-modal-credits-name">Created by Guy Tepper</span>
        <span className="settings-modal-credits-github">Fork on Github</span>
      </div>
    </Modal>
  );
}

export default SettingsModal;
