const config = require("../config");

module.exports.load = async function (app) {
	app.get("/forgot", async (req, res) => {
		res.send(`<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>SimpleCloud | Forgot password</title>
	<link href="/elements/style.css" rel="stylesheet" />
</head>

<body class="bg-neutral-800">
	<div class="p-5 mx-auto mt-16 max-w-md rounded shadow-sm">
		<h2 class="px-4 text-4xl text-center text-white">Change password </h2>
		<form class="mt-10 space-y-8" action="/api/auth/forgot" method="POST">
			<input class="px-4 w-full h-12 rounded border border-none focus:outline-none bg-stone-900 text-neutral-300" name="name" placeholder="Username"
				type="text" minlength="${config.auth.min_name_length}" maxlength="${config.auth.max_name_length}" pattern="[a-zA-Z0-9-]+" required />

			<div class="flex items-center">
				<input class="px-4 w-full h-12 rounded border border-none focus:outline-none bg-stone-900 text-neutral-300" name="token" placeholder="Token"
					type="password" minlength="${config.auth.min_pw_length}" maxlength="${config.auth.max_pw_length}" required />
			</div>
			<div class="flex items-center">
			<input class="px-4 w-full h-12 rounded border border-none focus:outline-none bg-stone-900 text-neutral-300" name="fileID" placeholder="File ID"
				type="text" minlength="${config.auth.min_pw_length}" maxlength="${config.auth.max_pw_length}" required />
			</div>
			<div class="flex items-center">
			<input class="px-4 w-full h-12 rounded border border-none focus:outline-none bg-stone-900 text-neutral-300" name="pw" placeholder="New password"
				type="password" minlength="${config.auth.min_pw_length}" maxlength="${config.auth.max_pw_length}" required />
			</div>
			<div>
				<div class="flex flex-col justify-between md:flex-row md:items-center">
					<input
						class="px-4 py-2 text-sm text-white uppercase bg-sky-500 rounded cursor-pointer active:bg-gray-700 font-regular"
						type="submit" value="change password" />
				</div>
			</div>
			</div>
		</form>
		<h2 class="absolute inset-x-0 bottom-0 px-16 mb-6 text-center text-white text-md">Please provide the valid File ID along with its file extension in the File ID field. Ensure that the File ID belongs to one of your active files and is not a deleted file. For instance, if you have a file with the URL "https://example.com/3x4mp.png", simply enter "3x4mp.png" as the File ID.</h2>
	</div>
</body>

</html>`);
	});
}