const config = require("../config.js");

module.exports.load = async function (app) {
	app.get("/edit", async (req, res) => {
		if (req.session.loggedIn) {
			res.send(`<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>SimpleCloud | Change password</title>
	<link href="/elements/style.css" rel="stylesheet" />
</head>

<body class="bg-neutral-800">
	<div class="p-5 mx-auto mt-16 max-w-md rounded shadow-sm">
		<h2 class="px-4 text-4xl text-center text-white">Login </h2>
		<form class="mt-10 space-y-8" action="/api/password" method="POST">
			<input class="px-4 w-full h-12 rounded border border-none focus:outline-none bg-stone-900 text-neutral-300" name="oldPw" placeholder="Old password"
				type="password" minlength="8" maxlength="64" required />

			<div class="flex items-center">
				<input class="px-4 w-full h-12 rounded border border-none focus:outline-none bg-stone-900 text-neutral-300" name="newPw" placeholder="New password"
					type="password" minlength="8" maxlength="64" required />
			</div>
			<div>
				<div class="flex flex-col justify-between md:flex-row md:items-center">
					<input
						class="px-4 py-2 text-sm text-white uppercase bg-sky-500 rounded cursor-pointer active:bg-gray-700 font-regular"
						type="submit" value="Change" />
				</div>
			</div>
		</form>
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