const TEST_ENDPOINT = "https://api.spotify.com/v1/me";
const REFRESH_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

const CLIENT_ID = "";
const CLIENT_SECRET = '';
const REFRESH_TOKEN = "";
let accessToken = "";

function run() {
    callEndpoint();
}

function callEndpoint() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", TEST_ENDPOINT, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.send();
    xhr.onload = function () {
        if (this.status === 200 || this.status === 201) {
            onSuccess(this.response);
        } else if (this.status === 401) {
            refreshToken();
        } else {
            console.error(this.status, this.responseText);
        }
    }
}

function refreshToken() {
    console.log("Refreshing Token")
    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN
    });

    let xhr = new XMLHttpRequest();
    xhr.open("POST", REFRESH_TOKEN_ENDPOINT, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET));
    xhr.send(body);
    xhr.onload = function() {
        if (this.status === 200) {
            const data = JSON.parse(this.responseText);
            const accessToken_ = data['access_token'];
            if (accessToken_ !== undefined) {
                console.log("Refreshed access token", accessToken_);
                accessToken = accessToken_;
                // Run again on success
                run();
            }
        } else {
            console.error(this.status, this.responseText);
        }
    };
}

function onSuccess(response) {
    document.getElementById("example").innerHTML = "Hello " + JSON.parse(response)['display_name'];
}