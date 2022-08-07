const bodyParser = require('body-parser');
const config = require("../config");
const generator = require("../modules/generator.js");
const sanitize = require("../modules/sanitize");
const crypto = require('crypto');

module.exports.load = async function (app, db) {
  app.post('/api/auth/login', bodyParser.urlencoded({
    extended: true
  }), async (req, res) => {
    if (!req.body.name) {
      res.redirect("/login");
    }
    if (!req.body.pw) {
      res.redirect("/login");
    }
    const name = await sanitize.clean(req.body.name);
    const dbName = db.get(name);
    if (!dbName || dbName == null || dbName == "null") {
      res.redirect("/login");
    } else {
      let saltHash = crypto.createHmac('sha256', dbName.salt);
      saltHash.update(req.body.pw);
      let pwHash = saltHash.digest('hex');
      if (pwHash == dbName.pw) {
        res.locals.name = name;
        req.session.loggedIn = true;
        req.session.name = res.locals.name;
        req.session.token = dbName.token;
        res.redirect('/dash');
      } else {
        res.redirect("/login");
      }
    }
  });

  app.post("/api/auth/register", bodyParser.urlencoded({
    extended: true
  }), async (req, res) => {
    if (config.auth.require_register_key) {
      if (req.body.regKey != config.auth.register_key) {
        return res.redirect("/register");
      }
    }
    if (!req.body.name) {
      return res.redirect("/register");
    }
    if (!req.body.pw) {
      return res.redirect("/register");
    }
    const name = await sanitize.clean(req.body.name);
    if(name == "") {
      return res.redirect("/register");
    }
    // Password hash
    const pwSalt = generator.gen(16)
    const saltHash = crypto.createHmac('sha256', pwSalt);
    saltHash.update(req.body.pw);
    const pwHash = saltHash.digest('hex');
    // Generate token
    const token = generator.gen(32);
    const checkName = db.get(name);
    if (!checkName) {
      db.set(name, {
        name: name,
        pw: pwHash,
        salt: pwSalt,
        token: token
      });
      db.push("accountList", name);
      req.session.loggedIn = true;
      req.session.name = name;
      req.session.token = token;
      res.redirect("/dash");
    } else {
      res.status(401).redirect("/login")
    }
  });
  app.post('/api/password', bodyParser.urlencoded({
    extended: true
  }), async (req, res) => {
    if (req.session.loggedIn) {
      if (!req.body.oldPw || !req.body.newPw) {
        res.redirect("/edit");
      }
      const name = await sanitize.clean(req.session.name);
      const dbName = db.get(name);
      const saltHash = crypto.createHmac('sha256', dbName.salt);
      saltHash.update(req.body.oldPw);
      const pwHash = saltHash.digest('hex');
      if (pwHash == dbName.pw) {
        const saltHash = crypto.createHmac('sha256', dbName.salt);
        saltHash.update(req.body.newPw);
        const pwHash = saltHash.digest('hex');
        const token = dbName.token;
        const pwSalt = dbName.salt;
        db.set(name, {
          name: name,
          pw: pwHash,
          salt: pwSalt,
          token: token
        });
        delete req.session.loggedIn;
        res.redirect("/login");
      } else {
        res.redirect("/login");
      }
    }
  });
}