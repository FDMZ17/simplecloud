module.exports.load = async function(app) {
  app.get("/dash", async (req, res) => {
    if(req.session.loggedIn) {
      res.send(`<title>Simple cloud | Dashboard</title>
      <h1>Welcome to the dashboard ${req.session.name}</h1>
      <h2>Here is your secreet token: <h3>${req.session.token}</h3></h2>
      <br>
      <p class="text-sm">The dashboard is comming soon!</p>
      <a href="/logout">Logout</a>
      `);
      res.end();
    } else {
      res.redirect("/login");
    }
  });
}
