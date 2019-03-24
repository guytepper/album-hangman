import React from 'react';
import Modal from '../Modal';
import Button from '../Button';
import './EndModal.css';

function EndModal() {
  return (
    <Modal className="end-modal">
      <h1 className="end-modal-title">YOU DID IT!</h1>
      <div>
        <p>Congratulations, you sure do know your music.</p>
        <p>Now go on and brag to your friends!</p>
      </div>
      <div>
        <Button type="primary" className="end-modal-facebook-btn">
          Share on Facebook
        </Button>
        <Button type="info" className="end-modal-twitter-btn">
          Share on Twitter
        </Button>
        <Button type="success">Play Again</Button>
      </div>
    </Modal>
  );
}

export default EndModal;
