
class HTTPProxy {

}

HTTPProxy.Server = require('./server');
HTTPProxy.createServer = options => {
  return new HTTPProxy.Server(options);
};

module.exports = HTTPProxy;
