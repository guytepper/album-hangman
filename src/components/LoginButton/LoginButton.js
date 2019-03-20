import React from 'react';
import './LoginButton.css';

function LoginButton({ text, icon, onClick }) {
  return (
    <button className="login-button" onClick={onClick}>
      <img alt="" src={icon} className="login-button-logo" />
      <span>{text}</span>
    </button>
  );
}

export default LoginButton;
