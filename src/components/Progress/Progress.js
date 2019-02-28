import React from 'react';
import './Progress.css';

function Progress({}) {
  return (
    <div className="progress-container">
      <span className="progress-thin-label">PROGRESS: 52 / 120</span>
      <div className="progress-wrap progress">
        <span className="progress-label">PROGRESS: 52 / 120</span>
        <div className="progress-bar progress" />
      </div>
    </div>
  );
}

export default Progress;
