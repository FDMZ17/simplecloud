const config = require("../config");

module.exports.load = async function (app, db) {
  app.get("/files", async (req, res) => {
    if (req.session.loggedIn) {
      const fetchDB = await db.get(`${req.session.name}files`)
      let i = 0;
      let tableRows = "";
      if (fetchDB) {
        const dbList = fetchDB.reverse();
        let pageNum = req.query.page || 1;
        const perPage = 10;
        const start = (pageNum - 1) * perPage;
        const end = start + perPage;
        const totalPages = Math.ceil(dbList.length / perPage);

        const paginatedList = dbList.slice(start, end);

        paginatedList.forEach((file) => {
          tableRows += `<tr> 
            <td><a target="_blank" class="inline-block mt-4 mb-3 ml-4 break-all text-md hover:text-primary" href="${config.website.app_url}/${file.id}">${file.name}</a></td>
            <td><p class="px-4 py-2 mt-4 ml-4 text-center text-white">${file.id}</p></td>
            <td><a target="_blank" href="${config.website.app_url}/${file.id}" class="px-3 py-2 mt-8 ml-4 text-center text-white bg-sky-500 rounded-lg border-2 border-sky-500 text-md hover:text-sky-500 hover:text-sky hover:bg-neutral-800">View</a></td>
            <td><a href="${config.website.app_url}/api/delete/${file.id}" class="px-3 py-2 mt-8 ml-4 text-center text-white bg-red-500 rounded-lg border-2 border-red-500 text-md hover:text-red-500 hover:text-red hover:bg-neutral-800">Delete</a></td>
          </tr>`;
        });

        let paginationLinks = "";
        if (totalPages > 1) {
          for (let i = 1; i <= totalPages; i++) {
            paginationLinks += `<a href="/files?page=${i}" class="px-4 py-2 mt-8 ml-4 text-center text-white rounded-lg border-2 bg-neutral-500 border-neutral-500 text-md hover:text-white hover:bg-neutral-800">${i}</a>`;
          }
        }

        res.send(`<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Simple cloud | File list</title>
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
                    <a href="/cli" class="block px-4 py-4 text-sm text-center text-white">Etc</a>
                    <a href="/logout" class="block px-4 py-4 text-sm text-center text-white">Logout</a>
                </div>
            </nav>
            <div class="container px-4 py-8 mx-auto">
                <h2 class="mb-8 text-4xl font-bold text-center text-white">Simple cloud</h2>
                <p class="mb-12 text-xl text-center text-white">Welcome back ${req.session.name}</p>
                <div class="w-full">
                    <h3 class="mb-4 text-xl font-bold text-center text-white">Your files:</h3>
                    <div class="flex mb-4 px-16 pt-8 pb-6">
                        <input type="text" id="searchInput"
                            class="flex-grow px-4 py-2 md:ml-4 text-white bg-transparent border-2 border-neutral-500 rounded-lg focus:outline-none focus:border-primary"
                            placeholder="Search file name">
                        <button id="searchButton"
                            class="invisible md:visible px-4 py-2 ml-4 text-center text-white bg-primary rounded-lg border-2 border-primary hover:text-primary hover:bg-white">Search</button>
                    </div>
                    <div class="overflow-scroll text-white rounded-lg shadow-md bg-neutral-700">
                        <table class="w-full">
                            <thead>
                                <tr class="text-sm leading-normal uppercase">
                                    <th class="px-6 py-3 text-left text-white py-">File name</th>
                                    <th class="px-6 py-3 text-center text-white">File ID</th>
                                    <th class="px-6 py-3 text-right text-white">Action</th>
                                </tr>
                            </thead>
                            <tbody id="fileTableBody">
                                ${tableRows}
                            </tbody>
                        </table>
                        ${paginationLinks}
                    </div>
                </div>
            </div>
            <script src="/elements/files.js"></script>
            <script src="/elements/dropdown.js"></script>
        </body>
        
        </html>`);
      } else {
        res.redirect("/upload");
      }
    } else {
      res.redirect("/login");
    }
  });
};
