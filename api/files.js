module.exports.load = async function(app) {
  app.get("/files", async (req, res) => {
    if(req.session.loggedIn) {
      res.send(`<p>Your files: </p>`);
      res.end();
    } else {
      res.redirect("/login");
    }
  });
}
