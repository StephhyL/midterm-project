const e = require("cors");
const io = require("socket.io-client");
const socket = io.connect("ws://localhost:3000");

let isConnected = false;

module.exports = function() {
  console.log("inside module export function")
  return new Promise ((resolve, reject)=> {
    if (!isConnected) {
      socket.on('connect', function() {
        isConnected = true;
        console.log("CONNNECCCTED HERE.")
        resolve(socket);
      });
    } else {
      resolve(socket);
    }
  })
}



