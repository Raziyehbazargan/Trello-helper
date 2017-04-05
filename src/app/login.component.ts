'use strict';



let trelloAuthBase = 'https://trello.com/1/authorize';
let trelloKey = `key=${process.env.TRELLO_KEY}`;
let trelloAppName = `name=${process.env.APP_NAME}`;
let trelloTokenExpiration = `expiration=never`;
let trelloAuthResponseType= `response_type=token`;
let callbackMethod = 'callback_method=fragment'
let scope = 'scope=read';
let trelloReturnUrl = `return_url=http://localhost:3000/api/auth/callback`;
let trelloAuthURL = `${trelloAuthBase}?${trelloTokenExpiration}&${scope}&${trelloAuthResponseType}&${trelloAppName}&${trelloKey}&${trelloReturnUrl}`;
