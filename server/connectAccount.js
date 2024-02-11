const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const fs = require('fs');

const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];

function authorize(credentials, callback) {
    const clientSecret = credentials.web.client_secret;
    const clientId = credentials.web.client_id;
    const redirectUrl = credentials.web.redirect_uris[0];
    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    const reslut = getAuthUrl(oauth2Client);
    return reslut;
}

function getAuthUrl(oauth2Client){
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    return [authUrl, oauth2Client];
}

function getNewToken(oauth2Client, code, callback) {
    (code) => {
      oauth2Client.getToken(code, function(err, token) {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return JSON.parse({ "mesege" : 'Error while trying to retrieve access token', err});
        }
        oauth2Client.credentials = token;
        storeToken(token);
        callback(oauth2Client);
      });
    };
}

function storeToken(token) {
    return token;
}

module.exports = authorize;
module.exports = getNewToken;