const awsServerlessExpress = require('aws-serverless-express');
const app = require('./dist/server');
const server = awsServerlessExpress.createServer(app.default);
exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  // event.path = event.requestContext.http.path;
  // event.method = event.requestContext.http.method;
  // event.httpMethod = event.requestContext.http.httpMethod;
  return awsServerlessExpress.proxy(server, event, context);
};
