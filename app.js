const express = require("express");
const session = require('express-session');
const app = express();
const db = require('quick.db');
const config = require("./config.js");
const fs = require("fs");

app.use(express.static(__dirname + "/public"));

app.use(session({
  name: "authToken",
  secret: "MySuperSecreetAuthToken",
  resave: false,
  saveUninitialized: true
}));

let apiFiles = fs.readdirSync('./api').filter(file => file.endsWith('.js'));
apiFiles.forEach(file => {
  let apiFile = require(`./api/${file}`);
  apiFile.load(app, db);
  console.log("| Loaded api: " + file + " |");
});


app.listen(config.WEB_PORT);
console.log("Running on port " + config.WEB_PORT);
