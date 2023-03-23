const config = require("../config");
const generator = require("../modules/generator.js");
const path = require("path");

module.exports.load = async function (app, db) {
  app.post("/api/upload", async (req, res) => {
    if (!req.session.loggedIn) {
      return res.redirect("/login");
    }
    if (res.files == 0) {
      return res.redirect("/upload");
    }
    const file = req.files.file;
    const fileExt = path.extname(file.name);
    if (config.upload.file_extention_check) {
      if (!config.upload.allowed_extention.includes(fileExt)) {
        return res.redirect("/upload");
      }
    }
    const rawID = generator.gen(config.upload.id_length);
    const fID = rawID + fileExt;
    const fileURL = config.website.app_url + "/" + fID;
    file.mv(`usercontent/${fID}`, (err) => {
      if (err) {
        return res.status(500).redirect("/");
      }
      return res.redirect(fileURL);
    });
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    db.push(`${req.session.name}files`, { name: file.name, id: fID });
    db.add(`${req.session.name}size`, Number(fileSize));
    db.push(`${rawID}`, fileSize);
  });

  app.post("/upload/curl", async (req, res) => {
    if (res.files == 0) {
      return res.send("Please attach a file");
    }
    if (!req.body.name) {
      return res.sendStatus(401);
    }
    if (!req.body.token) {
      return res.sendStatus(401);
    }
    const dbName = await db.get(req.body.name);
    if (req.body.token != dbName.token) {
      return req.sendStatus(401);
    }
    const file = req.files.file;
    const fileExt = path.extname(file.name);
    if (config.upload.file_extention_check) {
      if (!config.upload.allowed_extention.includes(fileExt)) {
        return res
          .status(422)
          .send("Files with this extension are not allowed");
      }
    }
    const rawID = generator.gen(config.upload.id_length);
    const fID = rawID + fileExt;
    const fileURL = config.website.app_url + "/" + fID;
    file.mv(`usercontent/${fID}`, (err) => {
      if (err) {
        return res.status(500);
      }
      return res.send(`${fileURL}\n`);
    });
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    db.push(`${req.session.name}files`, { name: file.name, id: fID });
    db.add(`${req.session.name}size`, Number(fileSize));
    db.push(`${rawID}`, fileSize);
  });
};
