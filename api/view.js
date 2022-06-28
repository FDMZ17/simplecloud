const config = require("../config.js");

module.exports.load = async function(app, db, dirls) {
  app.get("/:id", async (req, res) => {
    let fileChk = dirls();
    let fileID = req.path.replace("/", "");
    if (!fileChk.includes(fileID)) {
      return res.sendStatus(404)
    }
    res.send(`
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, minimum-scale=0.1">
  <meta property="og:url" content="${config.WEB_URL}${req.path}">
  <meta property="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#547C97">
  <meta name="description" content="${req.path}">
  <meta property="og:title" content="A file has appeared">
  <meta property="og:image" content="${config.WEB_URL}/usercontent${req.path}">
  <meta property="og:image:type" content="image/png" />
	<title>File preview | Simple cloud</title>
	<link href="/elements/style.css" rel="stylesheet" />
</head>

<body class="bg-neutral-800">
	<div class="mt-16 max-w-2xl p-5 mx-auto rounded shadow-sm">
    <h2 class="px-4 text-4xl text-white text-center">File preview</h2>
    <div class="flex flex-wrap w-full items-center justify-center">
      <!-- <iframe src="/usercontent${req.path}" class="max-w-full h-auto mt-14" alt="${req.path}"></iframe> --> 
      <object data="/usercontent${req.path}" class="max-w-full h-auto mt-14 text-white text-center bg-white" width="100%" >
        The requested data is not found!
      </object>
      <a target="_blank" class="inline-block text-base border-2 border-sky-500 hover:text-sky-500 hover:text-sky hover:bg-neutral-800 ml-5 mr-5 rounded-lg bg-sky-500 py-2 px-4 mb-3 text-white mt-6 text-center" href="/usercontent${req.path}">Download</a>
    </div>
  </div>
</body>
</html>`);
    res.end();
  });
}
