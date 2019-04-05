import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import './Error.css';

function Error({ message }) {
  return (
    <div className="error-container">
      <h1>{message}</h1>
      <Link to="/">
        <Button type="warning">Try again?</Button>
      </Link>
    </div>
  );
}

export default Error;
