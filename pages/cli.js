const config = require("../config.json");

module.exports.load = async function (app) {
  app.get("/cli", async (req, res) => {
    if (req.session.loggedIn) {
      res.send(`
     <!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Simple cloud | CLI</title>
	<link href="/elements/style.css" rel="stylesheet" />
</head>

<body class="bg-neutral-800">
	<div class="p-5 mx-auto mt-16 max-w-2xl rounded shadow-sm">
    <h2 class="px-4 text-4xl text-center text-white">Command line upload: </h2>
    <div class="flex flex-wrap justify-center items-center w-full">
      <input type="text" id="command" class="px-4 mt-10 w-full h-12 rounded border border-none focus:outline-none bg-stone-900 text-neutral-300" value='curl -F "file=@yourfile.png" -F "token=${req.session.token}" -F "name=${req.session.name}" ${config.website.app_url}/upload/curl' readonly>
      <button class="inline-block px-4 py-2 mt-6 mr-5 mb-3 ml-5 text-base text-center text-white bg-sky-500 rounded-lg border-2 border-sky-500 hover:text-sky-500 hover:text-sky hover:bg-neutral-800" 
      onclick="copyUrl()">Copy</button>
    </div>
  </div>
  <script src="/elements/script.js"></script>
</body>
</html>`);
      res.end();
    } else {
      res.redirect("/login");
    }
  });
}