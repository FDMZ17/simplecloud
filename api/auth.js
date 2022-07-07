const bodyParser = require('body-parser');
const config = require("../config.js");
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
    function genToken(length) {
      let result = [];
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
          charactersLength)));
      }
      return result.join('');
    }
    if (config.REQUIRE_REGISTER_KEY) {
      if (req.body.regKey != config.REGISTER_KEY) {
        return res.redirect("/register");
      }
    }
    if (!req.body.name) {
      return res.redirect("/register");
    }
    if (!req.body.pw) {
      return res.redirect("/register");
    }

    const name = req.body.name;
    // Password hash
    const saltHash = crypto.createHmac('sha256', config.PW_SALT);
    saltHash.update(req.body.pw);
    const pwHash = saltHash.digest('hex');
    // Generate token
    const token = genToken(32);
    const checkName = await db.get(req.body.name);
    if (!checkName) {
      db.set(name, {
        name: name,
        pw: pwHash,
        token: token
      });
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
      const dbName = await db.get(req.session.name);
      const saltHash = crypto.createHmac('sha256', config.PW_SALT);
      saltHash.update(req.body.oldPw);
      const pwHash = saltHash.digest('hex');
      if (pwHash == dbName.pw) {
        const saltHash = crypto.createHmac('sha256', config.PW_SALT);
        saltHash.update(req.body.newPw);
        const pwHash = saltHash.digest('hex');
        await db.set(`${req.session.name}.pw`, pwHash);
        delete req.session.loggedIn;
        res.redirect("/login");
      } else {
        res.redirect("/login");
      }
    }
  });
}