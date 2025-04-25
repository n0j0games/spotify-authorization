const SpotifyWebApi = require('spotify-web-api-node');
const {CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } = require('./env');

/**
 * Creates new auth token url for spotify
 */
function createAuth() {
    //Examples for Scopes ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-library-read']
    const scopes = []
    const state = '';

    let spotify_api = new SpotifyWebApi({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        redirectUri: REDIRECT_URL
    });
    const authorizeURL = spotify_api.createAuthorizeURL(scopes, state);
    console.log(authorizeURL);
    console.log("Click on the URL to receive code. Copy code from URL")
}

createAuth();