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
            <a class="inline-block text-md hover:text-primary mb-3 mt-8" href="${config.WEB_URL}/${dbList[i]}">${dbList[i]}</a> 
            <a href="${config.WEB_URL}/${dbList[i]}" class="text-md text-white text-center ml-4 border-2 border-sky-500 hover:text-sky-500 hover:text-sky hover:bg-neutral-800 mt-8 rounded-lg bg-sky-500 py-2 px-4">View</a>
            <a href="${config.WEB_URL}/delete/${dbList[i]}" class="text-md text-white text-center ml-4 border-2 border-red-500 hover:text-red-500 hover:text-red hover:bg-neutral-800 mt-8 rounded-lg bg-red-500 py-2 px-4">Delete</a>
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
	<div class="mt-16 max-w-2xl p-5 mx-auto rounded shadow-sm">
    <h2 class="px-4 text-4xl text-white text-center">Simple cloud dashboard</h2>
    <p class="px-4 text-xl text-white text-center mt-12">Welcome back ${req.session.name}</p>
    <div class="w-full">
      <h3 class="font-semibold text-xl text-white mb-3 text-center mt-8">Your file:</h3>
      <ul class="text-slate-300 text-center">
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
