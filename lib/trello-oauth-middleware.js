'use strict';

const request = require('superagent');
const session = require('express-session');
const OAuth = require('oauth').OAuth;
const url = require('url');

const debug = require('debug')('Trello-Report:trello-oauth-middleware');

const key = process.env.TRELLO_KEY ;
const secret = process.env.TRELLO_OAUTH_SECRET;
const app_url = process.env.API_URL || 'http://localhost:3000';
const appName = process.env.APP_NAME || 'Trello-Report';
const loginCallback = `${app_url}/api/auth/trello/callback`;

let userTokens = {};
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
    req.session.token_secret = oauth_token_secret;
    next();
  });
};

exports.generateAccessToken = function(req, res, next) {
  const query = url.parse(req.url, true).query;
  const token = query.oauth_token;
  const tokenSecret = req.session.token_secret;
  const verifier = query.oauth_verifier;

  oauth.getOAuthAccessToken(token, tokenSecret, verifier, (error, accessToken, accessTokenSecret, results) => {
    req.session.accessToken = accessToken;
    req.session.accessTokenSecret = accessTokenSecret;
    userTokens = {
      accessToken: accessToken,
      accessTokenSecret: accessToken
    };
  });
  next();
}

exports.userAccess = function(req, res, next) {
  console.log('req.session in apiAcess-->',req.session)
  req.userTokens = userTokens;
  req.oauth = oauth;
  next();
};
