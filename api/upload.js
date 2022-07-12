const config = require("../config.js");
const path = require("path");

module.exports.load = async function (app, db) {
  function genID(length) {
    let result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }
    return result.join('');
  }

  app.post("/api/upload", async (req, res) => {
    if (!req.session.loggedIn) {
      return res.redirect("/login");
    }
    if (res.files == 0) {
      return res.redirect("/upload");
    }
    const file = req.files.file;
    const fileExt = path.extname(file.name);
    if (config.FILE_EXTENTION_CHECK) {
      if (!config.ALLOWED_EXTENTION.includes(fileExt)) {
        return res.status(422).send("Files with this extension are not allowed");
      }
    }
    let fID = genID(config.ID_LENGTH) + fileExt;
    let fileURL = config.WEB_URL + "/" + fID;
    file.mv(`usercontent/${fID}`, (err) => {
      if (err) {
        return res.status(500).redirect("/")
      }
      return res.redirect(fileURL);
    });
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    await db.push(`${req.session.name}.files`, fID);
    await db.add(`${req.session.name}.size`, Number(fileSize));
    await db.push(`data.${fID}`, fileSize);
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
    const file = req.files.file;
    const fileExt = path.extname(file.name);
    if (config.FILE_EXTENTION_CHECK) {
      if (!config.ALLOWED_EXTENTION.includes(fileExt)) {
        return res.status(422).send("Files with this extension are not allowed");
      }
    }
    const fID = genID(config.ID_LENGTH) + fileExt;
    const fileURL = config.WEB_URL + "/" + fID;
    file.mv(`usercontent/${fID}`, (err) => {
      if (err) {
        return res.status(500);
      }
      return res.send(`${fileURL}\n`);
    });
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    await db.push(`${req.body.name}.files`, fID);
    await db.add(`${req.body.name}.size`, Number(fileSize));
    await db.push(`data.${fID}`, fileSize);
  });
}