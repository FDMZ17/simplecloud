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
    <p id="token" class="px-4 text-lg text-white items-center mt-5 invisible">Your upload token: ${req.session.token}</p>
    <div class="flex justify-center items-center mt-8">
      <button onclick="showToken()" class="text-base font-semi-bold text-red-600 rounded-full border-red-600 border-2 px-4 py-2">Token!</button>
    </div>
    <div class="flex flex-wrap items-center justify-center mt-16">
      <a href="/logout" class="text-xl text-white text-center hover:underline mr-5">Logout</a>
      <a href="/files" class="text-xl text-white text-center hover:underline ml-5">Files</a>
    </div>
  </div>
  <script src="/elements/dash.js"></script>
</body>
</html>
      `);
      res.end();
    } else {
      res.redirect("/login");
    }
  });
}
