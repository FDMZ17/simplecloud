module.exports.load = async function(app) {
  app.get("/dash", async (req, res) => {
    if(req.session.loggedIn) {
      res.send("<h1>Welcome to the dashboard $USER</h1>");
      res.end();
    } else {
      res.redirect("/login");
    }
  });
}
