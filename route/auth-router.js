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

var access_token;

authRouter.get('/api/auth/login', trelloOAUTH.generateToken, function(req, res, next) {
  console.log('I am in login route');
  access_token = req.trelloOAUTH.token_secret;
  res.send(JSON.stringify({ oauth_token: req.trelloOAUTH.token, name: req.trelloOAUTH.app_name }));
  next();
})

authRouter.get('/api/auth/trello/callback',trelloOAUTH.generateAccessToken, function(req, res, next) {
  debug('GET /api/auth/trello/callback');
    console.log('req.session in callback-->',req.session)
  //  return res.redirect(`home`)
    next();
});

authRouter.get('/api/trello/boards', trelloOAUTH.userAccess, function(req, res, next) {
  debug('GET /api/trello/boards');
  req.oauth.get(
    'https://api.trello.com/1/members/me',
     req.userTokens.accessToken,
     req.userTokens.accessTokenSecret,
     function(error, data, response){
       res.send(data)
     }
   );
});

authRouter.get('/api/trello/boards/:id', trelloOAUTH.userAccess, function(req, res, next) {
  debug('GET /api/trello/boards');
  req.oauth.get(
    `https://api.trello.com/1/boards/${req.params.id}`,
     req.userTokens.accessToken,
     req.userTokens.accessTokenSecret,
     function(error, data, response){
       res.send(data)
     }
   );
});

authRouter.get('/api/trello/boards/:id/cards', trelloOAUTH.userAccess, function(req, res, next) {
  debug('GET /api/trello/boards');
  req.oauth.get(
    `https://api.trello.com/1/boards/${req.params.id}/cards`,
     req.userTokens.accessToken,
     req.userTokens.accessTokenSecret,
     function(error, data, response){
       res.send(data)
     }
   );
});

//http://moonlitscript.com/post.cfm/how-to-use-oauth-and-twitter-in-your-node-js-expressjs-app/
// In a real app, the accessToken and accessTokenSecret should be stored
