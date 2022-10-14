const express = require("express");
const session = require('express-session');
const app = express();
const Database = require("./modules/db");
const db = new Database();
const config = require("./config");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const usercontentDir = __dirname + "/usercontent/"
const date_time = new Date();
const exec = require('child_process').exec;

app.set('trust proxy', 1);

app.use(express.static(__dirname + "/public"));

app.use(fileUpload({
  limits: {
    fileSize: 1024 * 1024 * config.upload.max_filesize
  },
  abortOnLimit: true
}));

app.use("/usercontent/", express.static('usercontent/'));

function dirls() {
  return fs.readdirSync("./usercontent");
}

app.use(session({
  name: "authToken",
  secret: date_time.toString(),
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: config.website.secure_cookie,
    maxAge: 1 * 12 * 60 * 60 * 1000
  }
}));

const pages = fs.readdirSync('./pages').filter(file => file.endsWith('.js'));
pages.forEach(file => {
  const page = require(`./pages/${file}`);
  page.load(app, db, dirls, usercontentDir);
});

const apiFiles = fs.readdirSync('./api').filter(file => file.endsWith('.js'));
apiFiles.forEach(file => {
  const apiFile = require(`./api/${file}`);
  apiFile.load(app, db, dirls, usercontentDir);
});

if (!fs.existsSync("usercontent")) {
  fs.mkdirSync("usercontent");
  console.info("Creating usercontent directory");
}

if (config.server.autoUpdate) {
  setInterval(() => {
    exec(`git pull`, (error, stdout) => {
      let response = (error || stdout);
      if (!error) {
        if (response.includes("Already up to date.")) {} else {
          console.info("[UPDATE] Restarting the app...")
          setTimeout(() => {
            process.exit();
          }, 1000)
        };
      }
    })
  }, 30000)
}

app.listen(config.website.port);
console.info("Running on: " + config.website.app_url);