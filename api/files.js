module.exports.load = async function(app) {
  app.get("/files", async (req, res) => {
    if (req.session.loggedIn) {
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
    <div class="w-full">
      <h3 class="font-semibold text-xl text-white mb-3">Your file:</h3>
      <ul class="text-slate-300">
      <li>
      <a class="inline-block text-base hover:text-primary mb-3" href="#home">File1</a>
      </li>
      <a class="inline-block text-base hover:text-primary mb-3" href="#about">File2</a>
      <li>
      <a class="inline-block text-base hover:text-primary mb-3" href="#portfolio">File3</a>
      </li>
      <a class="inline-block text-base hover:text-primary mb-3" href="#tech">File4</a>
      <li>
      <a class="inline-block text-base hover:text-primary mb-3" href="#contact">File5</a>
      </li>
      </ul>
    </div>
  </div>
</body>
</html>`);
      res.end();
    } else {
      res.redirect("/login");
    }
  });
}
