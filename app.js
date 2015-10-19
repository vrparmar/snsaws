-var ws = require("nodejs-websocket");
+var restify = require('restify');

 var port = process.env.PORT || 8001;

-// Create a server connection
-var server = ws.createServer(function (conn) {
-    console.info("New connection....");
+var server = restify.createServer({
+  name: 'myapp',
+  version: '1.0.0'
+});
+server.use(restify.acceptParser(server.acceptable));
+server.use(restify.queryParser());
+server.use(restify.bodyParser());

-    conn.on("text", function (str) {
-        console.log("Received "+str)
-        conn.sendText(str.toUpperCase()+"!!!")
-    })
+server.get('/echo/:name', function (req, res, next) {
+  res.send(req.params);
+  return next();
+});

-    // Fires when client closes connection
-    conn.on("close", function (code, reason) {
-        console.info("Connection closed");
-    })
-}).listen(port);
+server.post('/msg', function create(req, res, next) {
+   console.log(req.body);
+   res.send(201, Math.random().toString(36).substr(3, 8));
+   return next();
+ });
+
+server.listen(port, function () {
+  console.log('%s listening at %s', server.name, server.url);
+});
