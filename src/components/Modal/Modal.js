import React from 'react';
import './Modal.css';

function Modal({ className, children }) {
  return <div className={`modal ${className}`}>{children}</div>;
}

export default Modal;
