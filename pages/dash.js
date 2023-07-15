module.exports.load = async function (app, db) {
  app.get("/dash", async (req, res) => {
    if (req.session.loggedIn) {
      const dbList = await db.get(`${req.session.name}files`);
      let fileCount;
      if (dbList) {
        fileCount = dbList.length;
      } else {
        fileCount = 0;
      }

      const uploadedSize = await db.get(`${req.session.name}size`);
      let size;

      if (uploadedSize) {
        if (uploadedSize < 1) {
          size = `${(uploadedSize * 1024).toFixed(2)} KB`;
        } else if (uploadedSize >= 1 && uploadedSize < 1024) {
          size = `${uploadedSize.toFixed(2)} MB`;
        } else {
          size = `${(uploadedSize / 1024).toFixed(2)} GB`;
        }
      } else {
        size = 0;
      }

      res.send(`<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Simple cloud | Dashboard</title>
          <link href="/elements/style.css" rel="stylesheet" />
      </head>
      
      <body class="flex bg-neutral-700">
          <div class="flex overflow-y-hidden flex-col w-full h-screen">
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
                      <a href="/etc" class="block px-4 py-4 text-sm text-center text-white">Etc</a>
                      <a href="/logout" class="block px-4 py-4 text-sm text-center text-white">Logout</a>
                  </div>
              </nav>
              <div class="flex overflow-x-hidden flex-col w-full">
                  <div class="flex-grow p-6 mt-16 w-full">
                      <div class="flex flex-wrap">
                          <div class="p-3 w-full md:w-1/4 xl:w-1/3">
                              <div class="p-2 bg-white rounded border shadow">
                                  <div class="flex flex-row items-center">
                                      <div class="flex-1 text-right md:text-center">
                                          <h5 class="font-bold text-gray-500 uppercase">Username</h5>
                                          <h3 class="text-3xl font-bold">${req.session.name}</h3>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="p-3 w-full md:w-1/4 xl:w-1/3">
      
                              <div class="p-2 bg-white rounded border shadow">
                                  <div class="flex flex-row items-center">
                                      <div class="flex-1 text-right md:text-center">
                                          <h5 class="font-bold text-gray-500 uppercase">Uploaded file</h5>
                                          <h3 class="text-3xl font-bold">${fileCount}</h3>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="p-3 w-full md:w-1/4 xl:w-1/3">
      
                              <div class="p-2 bg-white rounded border shadow">
                                  <div class="flex flex-row items-center">
                                      <div class="flex-1 text-right md:text-center">
                                          <h5 class="font-bold text-gray-500 uppercase">Uploaded file</h5>
                                          <h3 class="text-3xl font-bold">${size}</h3>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <script src="/elements/dropdown.js"></script>
                  </div>
              </div>
          </div>
      </body>
      
      </html>`);
      res.end();
    } else {
      res.redirect("/login");
    }
  });
};
