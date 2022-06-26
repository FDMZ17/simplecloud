const express = require("express");
const session = require('express-session');
const app = express();
const {
  QuickDB
} = require('quick.db');
const db = new QuickDB();
const config = require("./config.js");
const fs = require("fs");
const fileUpload = require("express-fileupload");

// app.use(fileUpload());

app.use(express.static(__dirname + "/public"));

 app.use(fileUpload({
    limits: {
        fileSize: 1024 * 1024 * config.MAX_SIZE
    },
   abortOnLimit: true
 }));

app.use("/usercontent/", express.static('usercontent/'));

app.use(session({
  name: "authToken",
  secret: "MySuperSecreetAuthToken",
  resave: false,
  saveUninitialized: true,
  maxAge: 120000
}));

let apiFiles = fs.readdirSync('./api').filter(file => file.endsWith('.js'));
apiFiles.forEach(file => {
  let apiFile = require(`./api/${file}`);
  apiFile.load(app, db);
  console.log("| Loaded api: " + file + " |");
});

if (!fs.existsSync("usercontent")) {
  fs.mkdirSync("usercontent");
  console.log("Creating usercontent directory");
}

app.listen(config.WEB_PORT);
console.log("Running on: " + config.WEB_URL);

