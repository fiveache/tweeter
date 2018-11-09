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
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);


app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'pug');
app.use(express.static("public"));


// === MONGO CONNECTION ===

const MONGODB_URI = "mongodb://localhost:27017/tweeter";

const mongoDB = MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // === SESSIONS FOR TRACKING LOGINS ===

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    expires: new Date(Date.now() + (1)),
    store: new mongoStore({
      db: 'sessions',
      url: MONGODB_URI,
    }),
  }));

  // If session exists, make available in all routes:
  app.use((req, res, next) => {
    res.locals.currentUser = req.session.userID;
    next();
  });

  // These are helpers for querying the database:
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const UserHelpers = require("./lib/user-helpers.js")(db, ObjectID);

  // Routes:
  const main = require("./routes/main")(UserHelpers);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers, UserHelpers);
  app.use("/", main);
  app.use("/tweets", tweetsRoutes);

});

// Express server:
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
