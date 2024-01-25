const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const config = require("./config/db.js");
const account = require("./routes/account.js");

const app = express();

const port = 3000;

app.use(require('express-session')({
  secret: config.secret,
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.js')(passport);

app.use(cors());

app.use(bodyParser.json());

mongoose.connect(config.db);

mongoose.connection.on('connected', () => {
  console.log('Successful connected to the database')
});

mongoose.connection.on('error', (err) => {
  console.log('Error while connecting to database: ' + err)
})

app.listen(port, () => {
  console.log("Server running on port: " + port);
});

app.get("/", (req, res) => {
  res.send("Main page!");
});

app.use('/account', account)
