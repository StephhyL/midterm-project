// load .env data into process.env
require("dotenv").config();



// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const dbConnection = require('./db/connection');

const twilio = require('twilio'); //Twilio sms api
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


// connection imports


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

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
// const widgetsRoutes = require("./routes/widgets");



// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes);
app.use('/home', homeRoutes)
// app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
  // console.log("TEST ROUTE");
  // res.json({ id: "Rohit"});
});

// client.messages
//   .create({
//     body: 'Hello from Node',
//     to: process.env.TWILIO_TEST_PHONE_NUMBER, // Text this number
//     from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
//   })
//   .then((message) => console.log(message.sid))
//   .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
