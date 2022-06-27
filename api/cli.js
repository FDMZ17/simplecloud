const config = require("../config.js");

module.exports.load = async function(app) {
  app.get("/cli", async (req, res) => {
    if(req.session.loggedIn) {
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
	<div class="mt-16 max-w-2xl p-5 mx-auto rounded shadow-sm">
    <h2 class="px-4 text-4xl text-white text-center">Command line upload: </h2>
    <div class="flex flex-wrap w-full items-center justify-center">
      <input type="text" id="command" class="w-full h-12 px-4 border rounded focus:outline-none border-none bg-stone-900 text-neutral-300 mt-10" value='curl -F "file=@yourfile.png" -F "token=${req.session.token}" -F "name=${req.session.name}" ${config.WEB_URL}/upload/curl' readonly>
      <button class="inline-block text-base border-2 border-sky-500 hover:text-sky-500 hover:text-sky hover:bg-neutral-800 ml-5 mr-5 rounded-lg bg-sky-500 py-2 px-4 mb-3 text-white mt-6 text-center" 
      onclick="copyUrl()">Copy</button>
    </div>
  </div>
  <script>
  function copyUrl() {
			let copyText = document.getElementById("command");
			copyText.select();
			copyText.setSelectionRange(0, 99999);
			document.execCommand("copy");
			}
  </script>
</body>
</html>`);
      res.end();
    } else {
      res.redirect("/login");
    }
  });
}
