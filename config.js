module.exports = {
  "WEB_PORT": 8000, // web port
  "ID_LENGTH": 5, // fileID length
  "WEB_URL": "http://0.0.0.0:8000", // website url
  "REQUIRE_REGISTER_KEY": false, // true/false
  "SECURE_COOKIE": true, // true for https. false for http 
  "REGISTER_KEY": "simplecloud", // register key
  "MAX_SIZE": 100, // max file size per upload in MB
  "FILE_EXTENTION_CHECK": true, // true/false 
  "ALLOWED_EXTENTION": [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".mp4",
    ".mp3",
    ".webm",
    ".txt",
    ".json",
    ".js",
    ".css",
    ".scss",
    ".bash",
    ".tar.gz",
    ".zip",
    ".gz",
    ".html",
    ".svg",
    ".gpg",
    ".tar.xz",
    ".php",
    "",
    ".pptx",
    ".docx",
    ".pdf",
    ".ptx"
  ]
}