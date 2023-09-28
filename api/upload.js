const config = require("../config");
const generator = require("../modules/generator.js");
const path = require("path");
const mime = require('mime');

module.exports.load = async function (app, db) {
  app.post("/api/upload", async (req, res) => {
    if (!req.session.loggedIn) {
      return res.redirect("/login");
    }
    if (res.files == 0) {
      return res.redirect("/upload?error=nofile");
    }
    const file = req.files.file;
    const fileExt = path.extname(file.name);
    if (config.upload.file_extention_check) {
      const mimeType = mime.getType(fileExt);
      if (!config.upload.allowed_mime.includes(mimeType)) {
        return res
          .status(422)
          .send("File extention not allowed");
      }
    }
    const rawID = generator.gen(config.upload.id_length);
    const fID = rawID + fileExt;
    const fileURL = config.website.app_url + "/" + fID;
    file.mv(`usercontent/${fID}`, (err) => {
      if (err) {
        return res.status(500).redirect("/");
      }
      return res.send({ url: fileURL});
    });
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    const unixTimeStamp = Math.floor(Date.now() / 1000);
    db.push(`${req.session.name}files`, { name: file.name, id: fID, timeStamp: unixTimeStamp });
    db.add(`${req.session.name}size`, Number(fileSize));
    db.set(`${rawID}`, { size: fileSize, timeStamp: unixTimeStamp });
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
      if (!config.upload.allowed_mime.includes(mime.getType(fileExt))) {
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
    const unixTimeStamp = Math.floor(Date.now() / 1000);
    db.push(`${req.body.name}files`, { name: file.name, id: fID, timeStamp: unixTimeStamp });
    db.add(`${req.body.name}size`, Number(fileSize));
    db.push(`${rawID}`, { size: fileSize, timeStamp: unixTimeStamp });
  });
};