const config = require("../config");

module.exports.load = async function (app) {
	app.get("/register", async (req, res) => {
		if (config.auth.require_register_key) {
			res.send(`<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>SimpleCloud | Register</title>
	<link href="/elements/style.css" rel="stylesheet" />
</head>

<body class="bg-neutral-800">
	<div class="p-5 mx-auto mt-16 max-w-md rounded shadow-sm">
		<h2 class="px-4 text-4xl text-center text-white">Register</h2>
		<form class="mt-10 space-y-8" action="/api/auth/register" method="POST">
			<input class="px-4 w-full h-12 rounded border border-none focus:outline-none bg-stone-900 text-neutral-300" name="name" placeholder="Username"
				type="text" minlength="${config.auth.min_name_length}" maxlength="${config.auth.max_name_length}" pattern="[a-zA-Z0-9-]+" required />

			<div class="flex items-center">
				<input class="px-4 w-full h-12 rounded border border-none focus:outline-none bg-stone-900 text-neutral-300" name="pw" placeholder="Password"
					type="password" minlength="${config.auth.min_pw_length}" maxlength="${config.auth.max_pw_length}" required />
			</div>
        <input class="px-4 w-full h-12 rounded border border-none focus:outline-none bg-stone-900 text-neutral-300" name="regKey" placeholder="Register key"
					type="password" required />
			<div>
				<div class="flex flex-col justify-between md:flex-row md:items-center">
					<input
						class="px-4 py-2 text-sm text-white uppercase bg-sky-500 rounded cursor-pointer active:bg-gray-700 font-regular"
						type="submit" value="register now" />
					<a class="self-center mt-4 text-sm text-gray-400 underline md:self-auto md:mt-0" href="/login">
						Already have an account? Login
					</a>
				</div>
			</div>
		</form>
	</div>
</body>

</html>`);
		} else if (!config.auth.require_register_key) {
			res.send(`<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>SimpleCloud | Register</title>
	<link href="/elements/style.css" rel="stylesheet" />
</head>

<body class="bg-neutral-800">
	<div class="p-5 mx-auto mt-16 max-w-md rounded shadow-sm">
		<h2 class="px-4 text-4xl text-center text-white">Register</h2>
		<form class="mt-10 space-y-8" action="/api/auth/register" method="POST">
			<input class="px-4 w-full h-12 rounded border border-none focus:outline-none bg-stone-900 text-neutral-300" name="name" placeholder="Username"
				type="text" minlength="${config.auth.min_name_length}" maxlength="${config.auth.max_name_length}" required />

			<div class="flex items-center">
				<input class="px-4 w-full h-12 rounded border border-none focus:outline-none bg-stone-900 text-neutral-300" name="pw" placeholder="Password"
					type="password" minlength="${config.auth.min_pw_length}" maxlength="${config.auth.max_pw_length}" required />
			</div>
			<div>
				<div class="flex flex-col justify-between md:flex-row md:items-center">
					<input
						class="px-4 py-2 text-sm text-white uppercase bg-sky-500 rounded cursor-pointer active:bg-gray-700 font-regular"
						type="submit" value="register now" />
					<a class="self-center mt-4 text-sm text-gray-400 underline md:self-auto md:mt-0" href="/login">
						Already have an account? Login
					</a>
				</div>
			</div>
		</form>
	</div>
</body>

</html>
`);
		}
	});
}