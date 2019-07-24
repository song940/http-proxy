## http-proxy

> Simple HTTP Proxy in Node.js

### Installation

```bash
$ npm install http-proxy
```

### Example

```js
const proxy = require('http-proxy');

const server = proxy.createServer({
  user(username, password){
    return username === 'root' && password === '123456';
  }
});

server.listen(1080);
```

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT

This work is licensed under the [MIT license](./LICENSE).

---