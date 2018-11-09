"use strict";
require('dotenv').config();


// Basic express setup:

const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const {
  MongoClient,
  ObjectID
} = require("mongodb");
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);


app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'pug');
app.use(express.static("public"));


// === MONGO CONNECTION ===

mongoose.connect("mongodb://localhost:27017/tweeter", {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

// === SESSIONS FOR TRACKING LOGINS ===

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  expires: new Date(Date.now() + (1)),
  store: new mongoStore({
    mongooseConnection: db
  })
}));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.userID;
  next();
});


const DataHelpers = require("./lib/data-helpers.js")(db);
const UserHelpers = require("./lib/user-helpers.js")(db, ObjectID);

const main = require("./routes/main")(UserHelpers);
const tweetsRoutes = require("./routes/tweets")(DataHelpers, ObjectID);

app.use("/", main);
app.use("/tweets", tweetsRoutes);
//
// const MONGODB_URI = "mongodb://localhost:27017/tweeter";
//
// const mongoDB = MongoClient.connect(MONGODB_URI, (err, db) => {
//   if (err) {
//     console.error(`Failed to connect: ${MONGODB_URI}`);
//     throw err;
//   }
//
//   // The `data-helpers` module provides an interface to the database of tweets.
//   // This simple interface layer has a big benefit: we could switch out the
//   // actual database it uses and see little to no changes elsewhere in the code
//   // (hint hint).
//   //
//   // Because it exports a function that expects the `db` as a parameter, we can
//   // require it and pass the `db` parameter immediately:
//
// });
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
