module.exports.load = async function(app) {
  app.get("/dash", async (req, res) => {
    if(req.session.loggedIn) {
      res.send(`<title>FCloud | Dashboard</title><h1>Welcome to the dashboard ${req.session.name}</h1> <br> <p>The dashboard is comming soon!</p>`);
      res.end();
    } else {
      res.redirect("/login");
    }
  });
}
