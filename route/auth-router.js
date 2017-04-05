'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const trelloOAUTH = require('../lib/trello-oauth-middleware.js');
const debug = require('debug')('abba:auth-router');

const authRouter = module.exports = Router();

authRouter.get('/api/auth/callback', trelloOAUTH, function(req, res) {
  debug('GET /api/oauth/callback');
  console.log('i am in trello callback')
  console.log('req.query--->', req.params);
});
 
