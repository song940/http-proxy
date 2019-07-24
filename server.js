const url = require('url');
const http = require('http');
const { debuglog } = require('util');

const debug = debuglog('http-proxy');

class ProxyServer extends http.Server {
  constructor(options){
    super();
    Object.assign(this, options);
    this.on('request', (req, res) => {
      this.handle(req, res);
    });
  }
  handle(req, res) {
    if(this.authenticate(req) === false) {
      const realm = 'proxy';
      res.writeHead(407, {
        'Proxy-Authenticate': `Basic realm="${realm}"`
      });
      res.end();
      return;
    }
    const { method, headers } = req;
    const { host, port, path } = url.parse(req.url);
    debug('connect:', host, port);
    debug('request:', method, path);
    debug('headers', headers);
    this.proxy(req, res);
  }
  authenticate(req) {
    const authorization = req.headers['proxy-authorization'];
    if(!authorization) return false;
    const [ type, auth ] = authorization.split(' ');
    if(type === 'Basic') {
      const str = Buffer.from(auth, 'base64').toString();
      const [ username, password ] = str.split(':');
      debug('authenticate:', type, username, password);
      return this.user(username, password);
    }
    return false;
  }
  user(username, password){
    return true;
  }
  proxy(req, res){
    const { method, headers } = req;
    const { host, port, path } = url.parse(req.url);
    req.pipe(http.request({
      host,
      port,
      path,
      method,
      headers,
    }, response => {
      const { statusCode } = response;
      debug('remote server status:', statusCode);
      debug('remote server headers:', response.headers);
      res.writeHead(statusCode, response.headers);
      response.pipe(res);
    }));
  }
}

module.exports = ProxyServer;