# Generate Spotify API Access- & Refresh Token

## Setup

- Open [Spotify for Developer](https://developer.spotify.com/) and create a new project
- On the project dashboard, click `Edit` and add the `REDIRECT_URL` defined in `env.js` to the list of `Redirect URIs`
- Copy your `Client ID` and `Client Secret` from the project dashboard to the fields in `env.js`
- Make sure Node.JS (Version 20+) is installed on your device

## Run

- Use `npm i` in the command line to initialize the project
- Run `npm run auth` to generate an auth URL
- Open the URL in your browser. Copy the `AUTHCODE` from your browser url bar to the clipboard. The url should look like this: `https://127.0.0.1:5500/?code=AUTHCODE`
- Run `npm run generate-token AUTHCODE` with the copied `AUTHCODE` to generate access and refresh token

## Example

Note: The example method is unsafe. This method should rather be used via a secure Node.JS application

- Paste `CLIENT_ID`, `CLIENT_SECRET` from env and Authorization and Refresh Token from previous step into the empty fields
- Manipulate the authorization token (change a letter) to trigger instant refresh
- Open `index.html` in browser and click button to test