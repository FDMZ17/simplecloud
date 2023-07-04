const config = require("../config");

module.exports.load = async function (app) {
  app.get("/cli", async (req, res) => {
    if (req.session.loggedIn) {
      res.send(`<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Simple cloud | CLI</title>
          <link href="/elements/style.css" rel="stylesheet" />
      </head>
      
      <body class="bg-neutral-800">
          <nav class="bg-neutral-900">
              <div class="px-8 mx-auto max-w-6xl">
                  <div class="flex justify-between">
                      <div class="flex space-x-4">
                          <a class="flex items-center px-2 py-5 text-gray-700 hover:text-gray-900" href="#">
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
                              <a class="px-2 py-5 text-white hover:font-bold" href="/cli">CLI</a>
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
                  <a href="/cli" class="block px-4 py-4 text-sm text-center text-white">CLI</a>
                  <a href="/logout" class="block px-4 py-4 text-sm text-center text-white">Logout</a>
              </div>
          </nav>
          <div class="p-5 mx-auto mt-16 max-w-2xl rounded shadow-sm">
              <h2 class="px-4 text-4xl text-center text-white">Command line upload: </h2>
              <div class="flex flex-wrap justify-center items-center w-full">
                  <input type="text" id="command"
                      class="px-4 mt-10 w-full h-12 rounded border border-none focus:outline-none bg-stone-900 text-neutral-300"
                      value='curl -F "file=@yourfile.png" -F "token=${req.session.token}" -F "name=${req.session.name}" ${config.website.app_url}/upload/curl'
                      readonly>
                  <button
                      class="inline-block px-4 py-2 mt-6 mr-5 mb-3 ml-5 text-base text-center text-white bg-sky-500 rounded-lg border-2 border-sky-500 hover:text-sky-500 hover:text-sky hover:bg-neutral-800"
                      onclick="copyUrl()">Copy</button>
              </div>
          </div>
          <script src="/elements/script.js"></script>
          <script src="/elements/dropdown.js"></script>
      </body>
      
      </html>`);
      res.end();
    } else {
      res.redirect("/login");
    }
  });
}