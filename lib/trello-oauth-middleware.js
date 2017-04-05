'use strict';

const request = require('superagent');
const debug = require('debug')('Trello-Report:trello-oauth-middleware');
var url = require('url')

// You should {"token": "tokenSecret"} pairs in a real application
// Storage should be more permanent (redis would be a good choice)
const oauth_secrets = {};

module.exports = function(req, res, next) {
  if (req.query.error) {
    req.trelloError = new Error(req.query.error)
    return next()
  }

  let trelloAuthUrls = module.exports.trelloAuthUrls = {
    requestURL: "https://trello.com/1/OAuthGetRequestToken",
    accessURL: "https://trello.com/1/OAuthGetAccessToken",
    authorizeURL: "https://trello.com/1/OAuthAuthorizeToken",
  };

  // You should {"token": "tokenSecret"} pairs in a real application
  // Storage should be more permanent (redis would be a good choice)
 const oauth_secrets = {};

 let token, tokenSecret, verifier;
 request.get(trelloAuthUrls.requestURL)
 .then(response => {
    oauth_secrets[token] = response.body.tokenSecret;
   .set('Authorization', `Bearer ${response.body.access_token}`);
 })
 .then(response => {
   debug('trello-oauth-middleware response', response.body);
   req.trelloOAUTH = {
     trelloID: response.body.sub,
     email: response.body.email,
     accessToken,
     refreshToken,
     tokenTTL,
   };
   next();
 })
 .catch((err) => {
   req.googleError = err;
   next();
 });
}

//  let data = {
//   callback_method: 'fragment',
//   return_url: `${process.env.API_URL}/api/auth/callback`, // Trello redirects the user here after authentication
//   scope: 'read',
//   expiration: '1hour',
//   name: 'Trello-Report'
//   key: process.env.TRELLO_KEY,
//   client_secret: process.env.TRELLO_OAUTH_SECRET
// };
/*
in front end, user should click on a link 'login with trello' -->
https://trello.com/1/authorize?key=applicationkey&name=applicationname&expiration=never&response_type=token
*/

// const login = function(req, res) {
//   oauth.getOAuthRequestToken(function(error, token, tokenSecret, results){
//     oauth_secrets[token] = tokenSecret;
//     res.redirect(`${authorizeURL}?oauth_token=${token}&name=${appName}`);
//   });
// };

// var callback = function(request, response) {
//   const query = url.parse(request.url, true).query;
//   const token = query.oauth_token;
//   const tokenSecret = oauth_secrets[token];
//   const verifier = query.oauth_verifier;
//   oauth.getOAuthAccessToken(token, tokenSecret, verifier, function(error, accessToken, accessTokenSecret, results){
//     // In a real app, the accessToken and accessTokenSecret should be stored
//     oauth.getProtectedResource("https://api.trello.com/1/members/me", "GET", accessToken, accessTokenSecret, function(error, data, response){
//       // Now we can respond with data to show that we have access to your Trello account via OAuth
//       console.log(`in getProtectedResource - accessToken: ${accessToken}, accessTokenSecret: ${accessTokenSecret}`);
//       response.send(data)
//     });
//   });
// };
