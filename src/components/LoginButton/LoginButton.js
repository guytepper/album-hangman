import React from 'react';
import './LoginButton.css';

function LoginButton({ type, icon, onClick }) {
  return (
    <a className="login-button" onClick={onClick}>
      <img alt={type} src={icon} className="login-button-logo" />
      <span>Connect with {type}</span>
    </a>
  );
}

export default LoginButton;
