module.exports.load = async function(app) {
  app.get("/dash", async (req, res) => {
    if(req.session.loggedIn) {
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
    <div class="flex flex-wrap items-center justify-center mt-16">
      <a href="/logout" class="text-xl text-white text-center hover:bg-neutral-800 hover:text-red-500 border-2 border-red-500 mr-5 rounded-lg bg-red-500 py-2 px-4">Logout</a>
      <a href="/files" class="text-xl text-white text-center border-2 border-green-500 hover:text-green hover:text-green-500 hover:bg-neutral-800 ml-5 mr-5 rounded-lg bg-green-500 py-2 px-4">Files</a>
      <a href="/upload" class="text-xl text-white text-center ml-5 border-2 border-sky-500 hover:text-sky-500 hover:text-sky hover:bg-neutral-800 ml-5 mr-5 rounded-lg bg-sky-500 py-2 px-4">Upload</a>

    </div>
  </div>
</body>
</html>
      `);
      res.end();
    } else {
      res.redirect("/login");
    }
  });
}
