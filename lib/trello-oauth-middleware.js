'use strict';

const request = require('superagent');
var url = require('url');
var OAuth = require('oauth').OAuth;
const debug = require('debug')('Trello-Report:trello-oauth-middleware');

// let trelloAuthUrls = {
//   requestURL: 'https://trello.com/1/OAuthGetRequestToken',
//   accessURL: 'https://trello.com/1/OAuthGetAccessToken',
//   authorizeURL: 'https://trello.com/1/OAuthAuthorizeToken',
// };

const key = process.env.TRELLO_KEY;
const secret = process.env.TRELLO_OAUTH_SECRET;
const app_url = process.env.API_URL || 'http://localhost:3000';
const appName = process.env.APP_NAME || 'Trello-Report';

console.log('key: ', key);
console.log('secret: ', secret);
// Trello redirects the user here after authentication
const loginCallback = `${app_url}/api/auth/trello/callback`;

// You should {"token": "tokenSecret"} pairs in a real application
// Storage should be more permanent (redis would be a good choice)
//const oauth_secrets = {};

const oauth = new OAuth(
  'https://trello.com/1/OAuthGetRequestToken',
  'https://trello.com/1/OAuthGetAccessToken',
  key,
  secret,
  "1.0A",
  loginCallback,
  "HMAC-SHA1"
);

module.exports = function(req, res, next) {
  console.log('I am in middleware-trello')
  if (req.query.error) {
    console.log(req.query.error)
    req.trelloError = new Error(req.query.error)
    return next()
  }

  oauth.getOAuthRequestToken((error, oauth_token, oauth_token_secret, results) => {
    if (error) return console.log(error);
    req.trelloOAUTH = {
      token: oauth_token,
      token_secret: oauth_token_secret,
      app_name: appName
    }

    console.log(req.trelloOAUTH);
    next();
  });
};
