const proxy = require('..');

const server = proxy.createServer({
  user(username, password){
    return username === 'root' && password === '123456';
  }
});

server.listen(1080);