'use strict';

const request = require('superagent');
var http = require('http');
var url = require('url');
var OAuth = require('oauth').OAuth;
const debug = require('debug')('Trello-Report:trello-oauth-middleware');

let trelloAuthUrls = {
  requestURL: 'https://trello.com/1/OAuthGetRequestToken',
  accessURL: 'https://trello.com/1/OAuthGetAccessToken',
  authorizeURL: 'https://trello.com/1/OAuthAuthorizeToken',
};
// Be sure to include your key and secret in 🗝.env ↖️ over there.
// You can get your key and secret from Trello at: https://trello.com/app-key
const key = '557687e141bda221727da3e665af8d09';
const secret = process.env.TRELLO_OAUTH_SECRET;

// Trello redirects the user here after authentication
const loginCallback = 'http://localhost:3000/api/auth/callback';

// You should {"token": "tokenSecret"} pairs in a real application
// Storage should be more permanent (redis would be a good choice)
const oauth_secrets = {};

const oauth = new OAuth(trelloAuthUrls.requestURL, trelloAuthUrls.accessURL, key, secret, "1.0A", loginCallback, "HMAC-SHA1")

module.exports = function(req, res, next) {
  console.log('I am in middleware-trello')
  if (req.query.error) {
    console.log(req.query.error)
    req.trelloError = new Error(req.query.error)
    return next()
  }

  var login = function(req, res, next) {
  oauth.getOAuthRequestToken(function(error, token, tokenSecret, results){
    // console.log(`in getOAuthRequestToken - token: ${token}, tokenSecret: ${tokenSecret}, resultes ${JSON.stringify(results)}, error: ${JSON.stringify(error)}`);
    oauth_secrets[token] = tokenSecret;
    console.log('tokenSecret', error, );    //res.redirect(`${trelloAuthUrls.authorizeURL}?oauth_token=${token}&name=${process.env.APP_NAME}`);
  });
};
login();
var callback = function(req, res, next) {
  const query = url.parse(request.url, true).query;
  const token = query.oauth_token;
  const tokenSecret = oauth_secrets[token];
  const verifier = query.oauth_verifier;
  oauth.getOAuthAccessToken(token, tokenSecret, verifier, function(error, accessToken, accessTokenSecret, results){
    // In a real app, the accessToken and accessTokenSecret should be stored
    console.log(`in getOAuthAccessToken - accessToken: ${accessToken}, accessTokenSecret: ${accessTokenSecret}, error: ${error}`);
    oauth.getProtectedResource("https://api.trello.com/1/members/me", "GET", accessToken, accessTokenSecret, function(error, data, response){
      // Now we can respond with data to show that we have access to your Trello account via OAuth
      console.log(`in getProtectedResource - accessToken: ${accessToken}, accessTokenSecret: ${accessTokenSecret}`);
      response.send(data)
    });
  });
};
};
