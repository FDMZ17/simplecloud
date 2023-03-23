const fs = require("fs");

module.exports.load = async function (app, db, dirls, usercontentDir) {
  app.get("/api/delete/:id", async (req, res) => {
    if (req.session.loggedIn) {
      const reqFile = req.path.replace("/api/delete/", "");
      const [fileName, fileExt] = reqFile.split(".");
      const dbChk = await db.get(`${req.session.name}files`);
      let i = 0;
      while (i < dbChk.length) {
        if (!dbChk[i].id.includes(reqFile)) {
          i++;
        }
        const fileID = req.path.replace("/api/delete/", "");
        const dbCheck = db.get(`${fileName}`);
        if (!dbCheck) {
          return res.sendStatus(404);
        }
        const fileSize = Number(dbCheck[0]);
        fs.unlinkSync(usercontentDir + reqFile);
        console.log(db.get(`${req.session.name}files`, reqFile));
        db.pull(`${req.session.name}files`, dbChk[i]);
        db.delete(`${fileName}`);
        db.subtract(`${req.session.name}size`, fileSize);
        return res.redirect("/files");
      }
    } else {
      res.redirect("/login");
    }
  });
};
