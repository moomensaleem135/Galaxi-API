'use strict';
const App = require('./dist/server');
const serverless = require('serverless-http');
module.exports.main = serverless(App);
