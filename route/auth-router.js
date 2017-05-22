'use strict';

const http = require('http');
const OAuth = require('oauth').OAuth;
const Router = require('express').Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const session = require('express-session');
const debug = require('debug')('abba:auth-router');

const trelloOAUTH = require('../lib/trello-oauth-middleware.js');

const authRouter = module.exports = Router();

authRouter.get('/api/auth/login', trelloOAUTH.generateToken, function(req, res, next) {
  console.log('I am in login route');
  res.send(JSON.stringify({ oauth_token: req.trelloOAUTH.token, name: req.trelloOAUTH.app_name }));
  next();
})

authRouter.get('/api/auth/trello/callback',trelloOAUTH.generateAccessToken, function(req, res, next) {
  debug('GET /api/auth/trello/callback');

    console.log('I in callback-->in callback route', req.accessToken)
    //return res.redirect(`/#/home?token=${req.query.oauth_token}`);
    return res.redirect('http://localhost:3000/home')
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
