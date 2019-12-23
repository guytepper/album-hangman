import React from 'react';
import './LoginButton.css';

function LoginButton({ text, icon, onClick, style }) {
  return (
    <button className="login-button" onClick={onClick} style={style}>
      <img alt="" src={icon} className="login-button-logo" />
      <span>{text}</span>
    </button>
  );
}

export default LoginButton;
