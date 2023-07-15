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
          <nav class="bg-neutral-900">
              <div class="px-8 mx-auto max-w-6xl">
                  <div class="flex justify-between">
                      <div class="flex space-x-4">
                          <a class="flex items-center px-2 py-5 text-gray-700 hover:text-gray-900" href="/dash">
                              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                                  viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;">
                                  <path style="fill:#E8F4FC;"
                                      d="M426.667,256c0-94.257-76.41-170.667-170.667-170.667S85.333,161.743,85.333,256 C38.206,256,0,294.206,0,341.333s38.206,85.333,85.333,85.333h341.333c47.128,0,85.333-38.206,85.333-85.333 S473.794,256,426.667,256z" />
                                  <path style="fill:#D1E5F5;"
                                      d="M426.667,256c0-94.257-76.41-170.667-170.667-170.667v341.333h170.667 c47.128,0,85.333-38.206,85.333-85.333S473.794,256,426.667,256z" />
                              </svg>
                              <span class="ml-8 text-white hover:font-bold">SimpleCloud</span>
                          </a>
                          <div class="hidden items-center space-x-1 md:flex">
                              <a class="px-2 py-5 text-white hover:font-bold" href="/upload">Upload</a>
                              <a class="px-2 py-5 text-white hover:font-bold" href="/files">Files</a>
                              <a class="px-2 py-5 text-white hover:font-bold" href="/edit">Edit</a>
                              <a class="px-2 py-5 text-white hover:font-bold" href="/etc">Etc</a>
                          </div>
                      </div>
                      <div class="hidden items-center space-x-1 md:flex">
                          <a class="px-3 py-2 text-white bg-red-500 rounded shadow transition duration-300 hover:bg-red-600"
                              href="/logout">Logout</a>
                      </div>
                      <div class="flex items-center text-white md:hidden">
                          <button class="mobile-menu-button">
                              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M4 6h16M4 12h16M4 18h16" />
                              </svg>
                          </button>
                      </div>
                  </div>
              </div>
              <div class="hidden mobile-menu md:hidden">
                  <a href="/upload" class="block px-4 py-4 text-sm text-center text-white">Upload</a>
                  <a href="/files" class="block px-4 py-4 text-sm text-center text-white">Files</a>
                  <a href="/edit" class="block px-4 py-4 text-sm text-center text-white">Edit</a>
                  <a href="/cli" class="block px-4 py-4 text-sm text-center text-white">ETc</a>
                  <a href="/logout" class="block px-4 py-4 text-sm text-center text-white">Logout</a>
              </div>
          </nav>
          <div class="p-5 mx-auto mt-16 max-w-md rounded shadow-sm">
              <h2 class="px-4 text-4xl text-center text-white">Upload file</h2>
              <h2 class="px-4 mt-8 text-xl text-center text-white">Max size: ${size}</h2>
              <form class="mt-10 space-y-8" id="upload-form" enctype="multipart/form-data">
                  <input
                      class="px-4 w-full h-12 rounded border border-none focus:outline-none bg-neutral-800 text-neutral-300"
                      placeholder="File" type="file" name="file" required />
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
          <h2 class="absolute inset-x-0 bottom-0 px-16 mb-6 text-center text-white text-md">If the uploaded file extension is
              not in the allowed list or the file is larger than max file size, the file will not be uploaded</h2>
      
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
          <script src="/elements/dropdown.js"></script>
      </body>
      
      </html>
`);
    } else {
      res.redirect("/login");
    }
  });
};
