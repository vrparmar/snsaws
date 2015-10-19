var ws = require("nodejs-websocket");
var restify = require('restify');

 var port = process.env.PORT || 8001;

// Create a server connection
var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});


server.post('/msg', function create(req, res, next) {
   console.log(req.body);
   res.send(201, Math.random().toString(36).substr(3, 8));
   return next();
 });

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
