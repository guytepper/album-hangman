import React from 'react';
import classNames from 'classnames';
import './Modal.css';

function Modal({ className, children }) {
  const classes = classNames('modal', className);

  return <div className={classes}>{children}</div>;
}

export default Modal;
