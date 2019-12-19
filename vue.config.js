let configDefault = {};
if (process.env.NODE_ENV === 'development') {
  const deploy = require('./util/config.dev').inquire();
  configDefault.pages=deploy.pages
  configDefault.devServer=deploy.server;
} else {
  configDefault = require('./util/createDeploy').inquire;
}

module.exports = configDefault
