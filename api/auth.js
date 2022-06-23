const bodyParser = require('body-parser');
const config = require("../config.js");

module.exports.load = async function(app, db) {
  app.post('/api/auth/login', bodyParser.urlencoded(), async (req, res, next) => {
    if(!req.body.name) {
      res.redirect("/login");
    }
    let dbName = await db.get(req.body.name);
    if(!dbName) {
      res.redirect("/login");     
    }
    if (req.body.pw == dbName.pw) {
      res.locals.name = req.body.name;
      next();
    } else
      res.redirect("/login")
  }, (req, res) => {
    req.session.loggedIn = true
    req.session.name = res.locals.name
    console.log(req.session.name);
    res.redirect('/dash');
  });

  app.post("/api/auth/register", bodyParser.urlencoded(), (req, res) => {
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
    let pw = req.body.pw;
    console.log("New user request: " + name);
    db.set(name, {
      name: name,
      pw: pw
    });
    req.session.loggedIn = true;
    req.session.name = name
    res.redirect("/dash");
  });
}
