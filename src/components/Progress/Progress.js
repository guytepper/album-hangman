import React from 'react';
import './Progress.css';

function Progress({ type, progress, total }) {
  const PERCENT = (progress / total) * 100;

  if (type === 'thin') {
    return (
      <div className="progress-container">
        <span className="progress-thin-label">
          PROGRESS: {progress} / {total}
        </span>
        <div className="progress-wrap progress-thin">
          <div className="progress-bar progress-thin" style={{ width: PERCENT + '%' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="progress-container">
      <div className="progress-wrap progress">
        <span className="progress-label">
          PROGRESS: {progress} / {total}
        </span>
        <div className="progress-bar progress" style={{ width: PERCENT + '%' }} />
      </div>
    </div>
  );
}

export default Progress;
