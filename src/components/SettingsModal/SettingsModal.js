import React from 'react';
import Button from '../Button';
import './SettingsModal.css';

function SettingsModal({ className, setSettingsDisplay }) {
  return (
    <div className={`settings-modal ${className}`}>
      <div className="settings-modal-buttons">
        <Button type="warning">Reset Progress</Button>
        <Button type="warning">Logout</Button>
        <Button type="success" onClick={() => setSettingsDisplay(false)}>
          Close
        </Button>
      </div>
      <div className="settings-modal-credits">
        <span className="settings-modal-credits-name">Created by Guy Tepper</span>
        <span className="settings-modal-credits-github">Fork on Github</span>
      </div>
    </div>
  );
}

export default SettingsModal;
