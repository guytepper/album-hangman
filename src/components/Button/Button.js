import React from 'react';
import ReactLoading from 'react-loading';
import './Button.css';

export default function Button(props) {
  return (
    <button onClick={props.onClick} disabled={props.disabled} className="hangman-btn primary-btn">
      <div className="button-wrapper">
        <span className="button-loading-wrapper">
          {props.loading && <ReactLoading type="spin" width={20} height={20} />}
        </span>
        <span className="button-text-wrapper">{props.children}</span>
      </div>
    </button>
  );
}
