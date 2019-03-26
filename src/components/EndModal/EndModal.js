import React from 'react';
import Modal from '../Modal';
import Button from '../Button';
import './EndModal.css';

const twitterLink = `https://twitter.com/intent/tweet?text=Apparently%20I%20do%20know%20my%20music.%20What%20about%20you?&url=https://album-hangman.com`;
const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=https%3A//me.com`;
function EndModal() {
  return (
    <Modal className="end-modal">
      <h1 className="end-modal-title">YOU DID IT!</h1>
      <div>
        <p>Congratulations, you sure do know your music.</p>
        <p>Now go on and brag to your friends!</p>
      </div>
      <div className="end-modal-buttons">
        <Button type="primary" className="end-modal-facebook-btn">
          Share on Facebook
        </Button>
        <Button
          type="info"
          className="end-modal-twitter-btn"
          onClick={() =>
            window.open(twitterLink, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
          }
        >
          Share on Twitter
        </Button>
        <Button type="success">Play Again</Button>
      </div>
    </Modal>
  );
}

export default EndModal;
