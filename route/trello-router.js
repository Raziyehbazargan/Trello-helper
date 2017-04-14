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

const trelloRouter = module.exports = Router();

trelloRouter.get('/api/trello/boards', trelloOAUTH.userAccess, function(req, res, next) {
  debug('GET /api/trello/boards');
  req.oauth.get(
    'https://api.trello.com/1/members/me',
     req.userTokens.accessToken,
     req.userTokens.accessTokenSecret,
     function(error, data, response) {
       res.send(data)
     }
   );
   res.send(['yyyes','wwow']);
});

trelloRouter.get('/api/trello/boards/:id', trelloOAUTH.userAccess, function(req, res, next) {
  debug('GET /api/trello/boards');
  req.oauth.get(
    `https://api.trello.com/1/boards/${req.params.id}`,
     req.userTokens.accessToken,
     req.userTokens.accessTokenSecret,
     function(error, data, response) {
       res.send(data)
     }
   );
});

trelloRouter.get('/api/trello/boards/:id/cards', trelloOAUTH.userAccess, function(req, res, next) {
  debug('GET /api/trello/boards');
  req.oauth.get(
    `https://api.trello.com/1/boards/${req.params.id}/cards`,
     req.userTokens.accessToken,
     req.userTokens.accessTokenSecret,
     function(error, data, response) {
       res.send(data)
     }
   );
});
