const config = require("../config");

module.exports.load = async function (app, db) {
  app.get("/files", async (req, res) => {
    if (req.session.loggedIn) {
      const dbList = await db.get(`${req.session.name}files`).reverse();
      let i = 0;
      let tableRows = "";
      if (dbList) {
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
    <div class="container px-4 py-8 mx-auto">
      <h2 class="mb-8 text-4xl font-bold text-center text-white">Simple cloud dashboard</h2>
      <p class="mb-12 text-xl text-center text-white">Welcome back ${req.session.name}</p>
      <div class="w-full">
        <h3 class="mb-4 text-xl font-bold text-center text-white">Your files:</h3>
        <div class="overflow-scroll text-white rounded-lg shadow-md bg-neutral-700">
          <table class="w-full">
            <thead>
              <tr class="text-sm leading-normal uppercase">
                <th class="px-6 py-3 text-left text-white py-">File name</th>
                <th class="px-6 py-3 text-center text-white">File ID</th>
                <th class="px-6 py-3 text-right text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          ${paginationLinks}
        </div>
      </div>
    </div>
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
