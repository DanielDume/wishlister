//import { setInterval } from "timers";

ws = require("nodejs-websocket");
var socketServer;
function initSocketServer(){
    console.log("Creating socket server");
    socketServer = ws.createServer(function(conn){
        console.log("New connection");
        conn.on("text", function (str) {
            console.log("Received "+str);
            conn.sendText(str.toUpperCase()+"!!!")
        });
        conn.on("close", function (code, reason) {
            console.log("Connection closed")
        })
    }).listen(3001);    
}

exports.getServer = function (){
    if(socketServer === undefined){
        initSocketServer();
    }
    return socketServer;
};
exports.changeOccured = function(message) {
    var msg = JSON.stringify({
        message: message
    });
    socketServer.connections.forEach(function(conn) {
        conn.sendText(msg)
    });
};