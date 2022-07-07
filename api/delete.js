const fs = require("fs");

module.exports.load = async function(app, db, dirls, usercontentDir) {
  app.get("/api/delete/:id", async (req, res) => {
    if(req.session.loggedIn) {
      let reqFile = req.path.replace("/delete/", "");
      let dbChk = await db.get(`${req.session.name}.files`);
      if(!dbChk.includes(reqFile)) {
        return res.sendStatus(404);
      }
      await fs.unlinkSync(usercontentDir + reqFile);
      await db.pull(`${req.session.name}.files`, reqFile);
      return res.redirect("/files");
    } else {
      res.redirect("/login");
    }
  });
}
