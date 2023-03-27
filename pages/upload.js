const config = require("../config");

module.exports.load = async function (app, db) {
  app.get("/upload", async (req, res) => {
    let size;

    if (config.upload.max_filesize) {
      if (config.upload.max_filesize < 1) {
        size = `${(config.upload.max_filesize * 1024).toFixed(2)} KB`;
      } else if (
        config.upload.max_filesize >= 1 &&
        config.upload.max_filesize < 1024
      ) {
        size = `${config.upload.max_filesize.toFixed(2)} MB`;
      } else {
        size = `${(config.upload.max_filesize / 1024).toFixed(2)} GB`;
      }
    } else {
      size = 0;
    }
    if (req.session.loggedIn) {
      res.send(`<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Upload file</title>
	<link href="/elements/style.css" rel="stylesheet" />
</head>
<body class="bg-neutral-800">
	<div class="p-5 mx-auto mt-16 max-w-md rounded shadow-sm">
    <h2 class="px-4 text-4xl text-center text-white">Upload file</h2>
    <h2 class="px-4 mt-8 text-xl text-center text-white">Max size: ${size}</h2>
		<form class="mt-10 space-y-8" id="upload-form" enctype="multipart/form-data">
        <input class="px-4 w-full h-12 rounded border border-none focus:outline-none bg-neutral-800 text-neutral-300" placeholder="File"
					type="file" name="file" required />
			<div>
				<div class="flex flex-col justify-center md:flex-row md:items-center">
					<input
						class="px-4 py-2 text-sm text-white uppercase bg-orange-500 rounded cursor-pointer active:bg-gray-700 font-regular"
						type="button" value="Upload!" onclick="uploadFile()" />
				</div>
			</div>
		</form>
		<div id="progress-container" class="hidden">
			<p class="text-white">Uploading: <span id="progress-percentage">0%</span></p>
			<progress id="progress-bar" max="100" value="0"></progress>
		</div>
	</div>
	<h2 class="absolute inset-x-0 bottom-0 px-16 mb-6 text-center text-white text-md">If the uploaded file extension is not in the allowed list or the file is larger than max file size, the file will not be uploaded</h2>

	<script>
  function uploadFile() {
    const form = document.getElementById('upload-form');
    const fileInput = form.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file to upload');
        return;
    }
    const xhr = new XMLHttpRequest();
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');
    const progressContainer = document.getElementById('progress-container');
    progressContainer.classList.remove('hidden');
    xhr.upload.addEventListener('progress', function (event) {
        if (event.lengthComputable) {
            const percentComplete = Math.round(event.loaded / event.total * 100);
            progressBar.value = percentComplete;
            progressPercentage.innerText = percentComplete;
        }
    })
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('File uploaded successfully');
                window.location.href = '/files'
                progressContainer.classList.add('hidden');
                fileInput.value = ''; // Clear the file input
            } else {
                alert('File upload failed');
            }
        }
    }
    xhr.open('POST', '/api/upload', true);
    const formData = new FormData();
    formData.append('file', file);
    xhr.send(formData);
}
</script>
</body>
</html>
`);
    } else {
      res.redirect("/login");
    }
  });
};
