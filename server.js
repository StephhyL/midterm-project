// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const dbConnection = require('./db/connection');
const socket_client = require('./socket-client')

//server for socket.io
const server = require('http').createServer(app);
// const {Server} = require('socket.io')
// const io = new Server(server)

const io = require("socket.io")(server, {   cors: {     origin: "*"}});



// const io = (server, {
//   cors: {
//     origin: '*'
//   }
// });

// require('socket.io')

//Connecting to server.io; assigns a random id to anyone connected to our server
io.on('connection', (socket) => {
  console.log("new socket connection made (server.js)")
  console.log("socket id (server.js file) ---->", socket.id)
  socket.on("inputValue" , (data) => {
    console.log("The data below is received from server.js line 35 (customer to restaurant)->")
    console.log(data);

    io.emit("inputValue", data)
    // socket.to(room).emit("receive-message", message);
  })

  socket.on("time-message", (data)=> {
    console.log("reached the server.js socket for the customer notification:");
    console.log(data);
    io.emit("time-message", data)
  })

})

const twilio = require('twilio'); //Twilio sms api
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);



// connection imports

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
//app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//******************
app.get('/socket', (req, res) => {
  res.render('index')
})



app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const homeRoutes = require("./routes/home");
const userLoginRoutes = require('./routes/login');
const restaurantRoutes = require('./routes/restaurant')
const messageRoutes = require('./routes/message')
const newCartRoutes = require('./routes/newCart')


// Mount all resource routes
app.use("/api/users", usersRoutes);
app.use('/', homeRoutes)
app.use('/login', userLoginRoutes)
app.use("/restaurant", restaurantRoutes);
app.use("/message", messageRoutes);
app.use("/newcart", newCartRoutes);

// Note: mount other resources here, using the same pattern above


server.listen(3000, ()=> {
  console.log("This is socket port 3000")
})

socket_client();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
