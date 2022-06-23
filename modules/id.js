const slugify = require("./slugify.js");
const config = require("../config.js");

function generate(length) {
  let result = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() *
      charactersLength)));
  }
  return result.join('');
}

function validate(id, override) {
  if (override) {
    return id;
  }

  id = slugify(id);

  if (id.length > config.ID_MIN && id.length < config.ID_MAX) {
    return id;
  } else {
    throw ("ID is not valid.");
  }
}
