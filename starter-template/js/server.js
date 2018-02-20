// Include it and extract some methods for convenience
const server = require('server');
const { get, post } = server.router;

// Launch server with options and a couple of routes
server({ port: process.env.PORT || 1337 }, [
  get('/', ctx => 'Hello world'),
  post('/', ctx => console.log(ctx.data))
]);
