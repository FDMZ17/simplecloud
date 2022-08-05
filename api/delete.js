const fs = require("fs");

module.exports.load = async function (app, db, dirls, usercontentDir) {
  app.get("/api/delete/:id", async (req, res) => {
    if (req.session.loggedIn) {
      const reqFile = req.path.replace("/api/delete/", "");
      const [fileName, fileExt] = reqFile.split('.');
      const dbChk = await db.get(`${req.session.name}files`);
      if (!dbChk.includes(reqFile)) {
        return res.sendStatus(404);
      }
      const fileID = req.path.replace("/api/delete/", "");
      const dbCheck = db.get(`${fileName}`);
      if (!dbCheck) {
        return res.sendStatus(404);
      }
      const fileSize = Number(dbCheck[0]);
      fs.unlinkSync(usercontentDir + reqFile);
      db.pull(`${req.session.name}files`, reqFile);
      db.delete(`${fileName}`)
      db.subtract(`${req.session.name}size`, fileSize)
      return res.redirect("/files");
    } else {
      res.redirect("/login");
    }
  });
}