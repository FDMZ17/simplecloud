module.exports = {
  "WEB_PORT": 8000, // web port
  "ID_LENGTH": 5, // fileid length
  "WEB_URL": "http://0.0.0.0:8000", // website url
  "COOKIE_SECRET": "My cookie secret", // change it to random number/string
  "PW_SALT": "The salty salt", // password salt
  "REGISTER_KEY": "simplecloud", // register key
  "FILE_EXTENTION_CHECK": true, // enable file extention? yes=true no=false
  "MAX_SIZE": 100, // max file size per upload in MB
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
