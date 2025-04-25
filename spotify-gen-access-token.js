const SpotifyWebApi = require('spotify-web-api-node');
const {CLIENT_ID, CLIENT_SECRET, REDIRECT_URL} = require('./env');

/**
 *  Generates new access token and refresh token based on auth code
 *  Receive auth code from URL generated on { spotify-create-auth.js }
 */
function generateToken() {
    const args = process.argv;
    if (args.length < 2 || args[2] === undefined) {
        console.error("requires code as argument");
        return;
    }
    const code = args[2];
    console.log(code);

    let spotify_api = new SpotifyWebApi({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        redirectUri: REDIRECT_URL
    });

    spotify_api.authorizationCodeGrant(code).then(
        function(data) {
            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);
        },
        function(err) {
            console.log('Something went wrong!', err);
        }
    );
}

generateToken();