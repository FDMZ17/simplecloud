const config = require("../config.js");
const path = require("path");

module.exports.load = async function(app, db) {
  app.get("/upload", async (req, res) => {
    if (req.session.loggedIn) {
      res.send(` <!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Upload file</title>
	<link href="/elements/style.css" rel="stylesheet" />
</head>

<body class="bg-neutral-800">
	<div class="mt-16 max-w-md p-5 mx-auto rounded shadow-sm">
    <h2 class="px-4 text-4xl text-white text-center">Upload file</h2>
    <h2 class="mt-8 px-4 text-xl text-white text-center">Max size: ${config.MAX_SIZE}MB</h2>
		<form class="mt-10 space-y-8" action="/api/upload" method="POST" enctype="multipart/form-data">
        <input class="w-full h-12 px-4 border rounded focus:outline-none border-none bg-neutral-800 text-neutral-300" placeholder="File"
					type="file" name="file" required />
			<div>
				<div class="flex flex-col justify-center md:flex-row md:items-center">
					<input
						class="px-4 py-2 text-sm text-white uppercase bg-orange-500 rounded cursor-pointer active:bg-gray-700 font-regular"
						type="submit" value="Upload!" />
				</div>
			</div>
		</form>
	</div>
</body>

</html>
`);
    } else {
      res.redirect("/login");
    }
  });


  function genID(length) {
    let result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }
    return result.join('');
  }

  app.post("/api/upload", async (req, res) => {
    if (!req.session.loggedIn) {
      return res.redirect("/login");
    }
    if (res.files == 0) {
      return res.redirect("/upload");
    }
    const file = req.files.file;
    const fileExt = path.extname(file.name);
    if (config.FILE_EXTENTION_CHECK) {
      if (!config.ALLOWED_EXTENTION.includes(fileExt)) {
        return res.status(422).send("Files with this extension are not allowed");
      }
    }
    let fID = genID(config.ID_LENGTH) + fileExt;
    let fileURL = config.WEB_URL + "/" + fID;
    file.mv(`usercontent/${fID}`, (err) => {
      if (err) {
        return res.status(500).redirect("/")
      }
      return res.redirect(fileURL);
    });
    let dbFID = "/" + fID;
    db.push(`${req.session.name}.files`, fID);
    db.push(`globalTable`, dbFID);  });
}
