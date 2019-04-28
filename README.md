# Album Hangman

[![Build Status](https://travis-ci.org/guytepper/album-hangman.svg?branch=master)](https://travis-ci.org/guytepper/album-hangman)

Hangman game for music lovers, using the Spotify & Apple Music APIs.

## Installation and Development

1. Clone the repo, then run `yarn install`.
2. Run `cp .env .env.local` in the project root directory.
3. Log in to [**Spotify Developers Dashboard**](https://developer.spotify.com/dashboard) with your Spotify account.
4. Click on the **Create New Client ID** button.
5. Fill The following details:
   - **App or Hardware Name**: Album Hangman Dev
   - **App or Hardware Description**: Hangman game for music lovers
   - **What are you building?**: Website
6. In the next dialog - _"Are you developing a commercial integration?"_ - Press **No**.
7. Tick all the checkboxes in the final dialog, and press **Submit**.
8. Press **Edit Settings** and add `http://localhost:3000/game/` to the **Redirect URIs** section and press **Save**.
9. Copy the **Client ID** and paste it to `.env.local` file, to the `REACT_APP_SPOTIFY_ID` variable, and Change `REACT_APP_GAME_REDIRECT_URL` to `http://localhost:3000/game/`.
10. Run `yarn start` to start the dev server.

---

The project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
