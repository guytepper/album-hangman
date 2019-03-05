import React from 'react';
import './LoginButton.css';

function LoginButton({ type, icon, onClick }) {
  return (
    <button className="login-button" onClick={onClick}>
      <img alt={type} src={icon} className="login-button-logo" />
      <span>Connect with {type}</span>
    </button>
  );
}

export default LoginButton;
