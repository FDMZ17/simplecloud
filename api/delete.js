const fs = require("fs");

module.exports.load = async function (app, db, dirls, usercontentDir) {
  app.get("/api/delete/:id", async (req, res) => {
    if (req.session.loggedIn) {
      const reqFile = req.path.replace("/api/delete/", "");
      const [fileName, fileExt] = reqFile.split('.');
      const dbChk = await db.get(`${req.session.name}.files`);
      if (!dbChk.includes(reqFile)) {
        return res.sendStatus(404);
      }
      const fileID = req.path.replace("/api/delete/", "");
      const dbCheck = await db.get(`data.${fileName}`);
      if (!dbCheck) {
        return res.sendStatus(404);
      }
      const fileSize = Number(dbCheck);
      await fs.unlinkSync(usercontentDir + reqFile);
      await db.pull(`${req.session.name}.files`, reqFile);
      await db.delete(`data.${fileName}`)
      await db.sub(`${req.session.name}.size`, fileSize)
      return res.redirect("/files");
    } else {
      res.redirect("/login");
    }
  });
}