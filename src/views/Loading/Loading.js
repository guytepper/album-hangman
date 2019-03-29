import React from 'react';
import ReactLoading from 'react-loading';

export default function LoadingComponent() {
  return (
    <div className="loading-state">
      <ReactLoading type="bubbles" color="black" height={150} width={150} />
      <h1 style={{ marginTop: 0 }}>Loading...</h1>
    </div>
  );
}
