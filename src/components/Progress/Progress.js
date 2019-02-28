import React from 'react';
import './Progress.css';

function Progress() {
  return (
    <div className="progress-wrap progress">
      <div className="progress-bar progress" />
      <span className="progress-label">PROGRESS: 52 / 120</span>
    </div>
  );
}

export default Progress;
