const config = require("../config.js");

module.exports.load = async function (app, db, dirls) {
  app.get("/:id", async (req, res) => {
    const fileChk = dirls();
    const fileID = req.path.replace("/", "");
    if (!fileChk.includes(fileID)) {
      return res.sendStatus(404)
    }
    const reqFile = req.path.replace("/", "");
    console.log(reqFile)
    const dbChk = await db.get(`data.${reqFile}`);
    if (!dbChk) {
      return res.sendStatus(404);
    }
    const fileSize = dbChk;
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
	<div class="p-5 mx-auto mt-16 max-w-2xl rounded shadow-sm">
    <h2 class="px-4 text-4xl text-center text-white">File preview</h2>
    <div class="flex flex-wrap justify-center items-center w-full">
      <!-- <iframe src="/usercontent${req.path}" class="mt-14 max-w-full h-auto" alt="${req.path}"></iframe> --> 
      <object data="/usercontent${req.path}" class="mt-14 max-w-full h-auto text-center text-white bg-white" width="100%" >
        The requested data is not found!
      </object>
      <a target="_blank" class="inline-block px-4 py-2 mt-6 mr-5 mb-3 ml-5 text-base text-center text-white bg-sky-500 rounded-lg border-2 border-sky-500 hover:text-sky-500 hover:text-sky hover:bg-neutral-800" href="/usercontent${req.path}">Download</a>
    </div>
  </div>
</body>
<footer>
<h2 class="px-4 text-lg text-center text-white">Size: ${fileSize} MB</h2>
</footer>
</html>`);
    res.end();
  });
}