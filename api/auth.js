const bodyParser = require('body-parser');

module.exports.load = async function(app) {
  app.post('/api/auth/login', bodyParser.urlencoded(), (req, res, next) => {
    if (req.body.name == 'foo' && req.body.pw == 'bar') {
      res.locals.name = req.body.name;
      next();
    } else
      res.sendStatus(401);
  }, (req, res) => {
    req.session.loggedIn = true
    req.session.name = res.locals.name
    console.log(req.session.name);
    res.redirect('/dash');
  });
}
