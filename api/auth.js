const bodyParser = require('body-parser');
const config = require("../config.js");
const crypto = require('crypto');

module.exports.load = async function(app, db) {
  app.post('/api/auth/login', bodyParser.urlencoded({ extended: true }), async (req, res) => {
    if (!req.body.name) {
      res.redirect("/login");
    }
    if (!req.body.pw) {
      res.redirect("/login");
    }
    let dbName = await db.get(req.body.name);
    if (!dbName || dbName == null || dbName == "null") {
      res.redirect("/login");
    } else {
      let saltHash = crypto.createHmac('sha256', config.PW_SALT);
      saltHash.update(req.body.pw);
      let pwHash = saltHash.digest('hex');
      if (pwHash == dbName.pw) {
        res.locals.name = req.body.name;
        req.session.loggedIn = true;
        req.session.name = res.locals.name;
        res.redirect('/dash');
      } else {
        res.redirect("/login");
      }
    }
  });

  app.post("/api/auth/register", bodyParser.urlencoded({ extended: true }), async (req, res) => {
    if (req.body.regKey != config.REGISTER_KEY) {
      return res.redirect("/register");
    }
    if (!req.body.name) {
      return res.redirect("/register");
    }
    if (!req.body.pw) {
      return res.redirect("/register");
    }

    let name = req.body.name;
    // Password hash
    let saltHash = crypto.createHmac('sha256', config.PW_SALT);
    saltHash.update(req.body.pw);
    let pwHash = saltHash.digest('hex');
    let checkName = await db.get(req.body.name);
    if (!checkName) {
      db.set(name, {
        name: name,
        pw: pwHash
      });
      req.session.loggedIn = true;
      req.session.name = name;
      res.redirect("/dash");
    } else {
      res.status(401).redirect("/login")
    }
  });

  app.get('/logout', async (req, res) => {
    if (req.session.loggedIn) {
      delete req.session.loggedIn;
      res.redirect("/")
    } else {
      res.redirect("/login");
    }
  });
}
