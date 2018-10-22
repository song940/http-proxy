const Proxy = require('..');

const proxy = new Proxy((req, res) => {
  console.log(req.url);
  res.end('ok');
});

proxy.listen(8080);