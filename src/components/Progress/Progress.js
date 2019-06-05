import React from 'react';
import './Progress.css';

function Progress({ progress, total }) {
  const PERCENT = (progress / total) * 100;

  return (
    <div className="progress-container">
      <span className="progress-label progress-thin-label">
        PROGRESS: {progress} / {total}
      </span>
      <div className="progress-wrap progress">
        <span className="progress-label progress-large-label">
          PROGRESS: {progress} / {total}
        </span>
        <div className="progress-bar progress" style={{ width: PERCENT + '%' }} />
      </div>
    </div>
  );
}

export default React.memo(Progress);
