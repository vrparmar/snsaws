var ws = require("nodejs-websocket");

var port = process.env.VCAP_APP_PORT || 8001;

// Create a server connection
var server = ws.createServer(function (conn) {
    console.info("New connection");

    conn.on("text", function (str) {
        console.log("Received "+str)
        conn.sendText(str.toUpperCase()+"!!!")
    })

    // Fires when client closes connection
    conn.on("close", function (code, reason) {
        console.info("Connection closed");
    })
}).listen(port);
