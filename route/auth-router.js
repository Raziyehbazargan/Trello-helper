'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
var http = require('http')
var OAuth = require('oauth').OAuth
var url = require('url');
var session = require('express-session');
const trelloOAUTH = require('../lib/trello-oauth-middleware.js');
const debug = require('debug')('abba:auth-router');

const authRouter = module.exports = Router();

authRouter.get('/api/auth/login', trelloOAUTH.generateToken, function(req, res, next) {
  debug('I am in login route');
  access_token = req.trelloOAUTH.token_secret;
  res.redirect(`https://trello.com/1/OAuthAuthorizeToken?oauth_token=${req.trelloOAUTH.token}&name=${req.trelloOAUTH.app_name}`)
})

authRouter.get('/api/auth/trello/callback',trelloOAUTH.generateAccessToken, function(req, res, next) {
  debug('GET /api/auth/trello/callback');
    //debug('req.session in callback-->',req.session)
  //res.redirect(`./src/index.html`)
});
