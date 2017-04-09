'use strict';

const request = require('superagent');
var url = require('url');
var OAuth = require('oauth').OAuth;
const debug = require('debug')('Trello-Report:trello-oauth-middleware');

const key = process.env.TRELLO_KEY || 'cc7b829378671f4c1102838ae11992b5';
const secret = process.env.TRELLO_OAUTH_SECRET || 'aa92f1e070edc21cc7781119a47f089dc51ce8a8831ee1bba1ac9978b979ae05';
const app_url = process.env.API_URL || 'http://localhost:3000';
const appName = process.env.APP_NAME || 'Trello-Report';
const loginCallback = `${app_url}/api/auth/trello/callback`;

let token_secret;
const oauth = new OAuth(
  'https://trello.com/1/OAuthGetRequestToken',
  'https://trello.com/1/OAuthGetAccessToken',
  key,
  secret,
  "1.0A",
  loginCallback,
  "HMAC-SHA1"
);

module.exports = exports = {};

exports.generateToken = function(req, res, next) {
  if (req.query.error) {
    req.trelloError = new Error(req.query.error)
    return next();
  }
  oauth.getOAuthRequestToken((error, oauth_token, oauth_token_secret, results) => {
    if (error) {
      return new Error(error);
      return next();
    }
    req.trelloOAUTH = {
      token: oauth_token,
      token_secret: oauth_token_secret,
      app_name: appName
    }
    token_secret = oauth_token_secret;
    next();
  });
};

exports.generateAccessToken = function(req, res, next) {
  const query = url.parse(req.url, true).query;
  const token = query.oauth_token;
  const tokenSecret = token_secret;
  const verifier = query.oauth_verifier;

  oauth.getOAuthAccessToken(token, tokenSecret, verifier, function(error, accessToken, accessTokenSecret, results){
    oauth.getProtectedResource('https://api.trello.com/1/members/me', "GET", accessToken, accessTokenSecret, function(error, data, response){
      res.send(data)
    });
  });
  next();
}
