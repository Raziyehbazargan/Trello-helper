'use strict';

// npm modules
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const express = require('express');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const debug = require('debug')('abba:server');

// app modules
const authRouter = require('./route/auth-router.js');
const trelloRouter = require('./route/trello-router.js');
const errorMiddleware = require('./lib/error-middleware.js');

// load environment vars
dotenv.load();

// setup DB & configure mongoose for promises
// mongoose.Promise = Promise;
// mongoose.connect(process.env.MONGODB_URI);

// module constants
const PORT = process.env.PORT;
const app = express();

// app routes
app.use(express.static(`${__dirname}/build`));
app.use(authRouter);
app.use(trelloRouter);

// app middleware
app.use(cors());
app.use(morgan('dev'));
app.use(errorMiddleware);

// start server
const server = module.exports = app.listen(PORT, () => {
  debug(`server up on ${PORT}`);
});

server.isRunning = true;
