const fileID = require("../modules/id.js");

module.exports.load = async function(app) {
  app.post("/api/upload", async (req, res) => {
    if (res.files == 0) {
      return res.status(415).json({
        success: false,
        message: "No file was uploaded, please add a file"
      });
    }
    return res.status(200).json({
      success: true,
      message: "File was uploaded",
      url: "Comming soon!"
    });
  });
}
