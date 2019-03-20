import React from 'react';
import './Hearts.css';

function Hearts({ lives }) {
  const hearts = [];

  // For each live, display an heart icon
  for (let i = 4; i > 0; i--) {
    let heartClassName = 'heart';
    if (i <= 4 - lives) {
      heartClassName += ' heart-dead';
    }
    hearts.push(
      <svg className={heartClassName} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg" key={i}>
        <path
          d="M2.75 0v1.42h2.74V0H2.75zm2.74 1.42v1.41h1.37V1.42H5.49zm1.37 1.41v1.42h1.38V2.83H6.86zm1.38 0H9.6V1.42H8.24v1.41zM9.6 1.42h2.74V0H9.61v1.42H9.6zM9.55 2.7h2.75V1.3h-1.38l-1.31.12-.06 1.3V2.7zm2.8-1.28v1.41h1.38V1.42h-1.38zm1.38 1.41v4.25h1.37V2.83h-1.37zm0 4.25h-1.38v1.41h1.38V7.08zm-1.38 1.41h-1.37v1.42h1.37V8.49zm-1.37 1.42H9.61v1.41h1.37V9.91zm-1.37 1.41H8.24v1.42H9.6v-1.42h.01zm-1.37 1.42H6.86v1.41h1.38v-1.41zm-1.38 0v-1.42H5.5v1.42h1.37-.01zM5.5 11.32V9.91H4.12v1.41H5.5zM4.12 9.91V8.49H2.75v1.42h1.37zM2.75 8.49V7.08H1.37v1.41h1.38zM1.37 7.08V2.83H0v4.25h1.37zm12.36 0l.14-1.87V1.35c-2.56.05-4 .1-4.3.18-2.09.5-.62 1.04-1.2 1.3h-.12c-.88.44-.32 1.33-.7 1.38-.17.03-.39-1.01-.7-1.38-.29-.33-.68 0-.78 0-.76 0-.37-1.01-.56-1.3-.03-.04 0-.18-.07-.18h-4.2v3.86l.13 1.87h12.36zm-6.18 6.37c.75-.65 1.36-1.4 2.03-2.12.46-.5 1-.94 1.42-1.47.41-.54.99-.87 1.35-1.37.2-.28.43-.75.69-1.41H2.06l.69 1.41 4.8 4.96zM1.37 2.83h1.38V1.42H1.37v1.41z"
          fillRule="nonzero"
        />
      </svg>
    );
  }

  return (
    <div className="hearts-container">
      <div>{hearts}</div>
    </div>
  );
}

export default Hearts;
