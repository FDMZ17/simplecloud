const config = require("../config.js");

module.exports.load = async function(app, db) {
  app.get("/files", async (req, res) => {
    if (req.session.loggedIn) {
      let dbList = await db.get(`${req.session.name}.files`);
      let i = 0;
      let listFile = [];
      if (dbList) {
        while (i < dbList.length) {
          listFile.push(`<li> 
            <a target="_blank" class="inline-block mt-8 mb-3 text-md hover:text-primary" href="${config.WEB_URL}/${dbList[i]}">${dbList[i]}</a> 
            <a target="_blank" href="${config.WEB_URL}/${dbList[i]}" class="px-4 py-2 mt-8 ml-4 text-center text-white bg-sky-500 rounded-lg border-2 border-sky-500 text-md hover:text-sky-500 hover:text-sky hover:bg-neutral-800">View</a>
            <a href="${config.WEB_URL}/delete/${dbList[i]}" class="px-4 py-2 mt-8 ml-4 text-center text-white bg-red-500 rounded-lg border-2 border-red-500 text-md hover:text-red-500 hover:text-red hover:bg-neutral-800">Delete</a>
          </li>`);
          i++;
        }

        res.send(`
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Simple cloud | Dashboard</title>
	<link href="/elements/style.css" rel="stylesheet" />
</head>

<body class="bg-neutral-800">
	<div class="p-5 mx-auto mt-16 max-w-2xl rounded shadow-sm">
    <h2 class="px-4 text-4xl text-center text-white">Simple cloud dashboard</h2>
    <p class="px-4 mt-12 text-xl text-center text-white">Welcome back ${req.session.name}</p>
    <div class="w-full">
      <h3 class="mt-8 mb-3 text-xl font-semibold text-center text-white">Your file:</h3>
      <ul class="text-center text-slate-300">
      ${listFile.reverse().join("")}
      </ul>
    </div>
  </div>
</body>
</html>`);
        res.end();
      } else {
        res.redirect("/upload");
      }
    } else {
      res.redirect("/login");
    }
  });
}
