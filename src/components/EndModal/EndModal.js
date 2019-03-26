import React from 'react';
import Modal from '../Modal';
import Button from '../Button';
import './EndModal.css';

const facebookLink = `https://www.facebook.com/dialog/share?
app_id=265726350983437&
display=popup&
href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&
picture=http://fbrell.com/f8.jpg&
title=I know my music!&
caption=Reference%20Documentation&
description=Dialogs%20provide%20a%20simple,%20consistent%20interface%20for%20applications%20to%20interact%20with%20users.&
message=Facebook%20Dialogs%20are%20so%20easy!&
redirect_uri=https://album-hangman.com`;

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
        <Button type="info" className="end-modal-twitter-btn">
          Share on Twitter
        </Button>
        <Button type="success">Play Again</Button>
      </div>
    </Modal>
  );
}

export default EndModal;
