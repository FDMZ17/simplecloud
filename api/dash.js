const config = require("../config.js")
module.exports.load = async function(app, db) {
  app.get("/dash", async (req, res) => {
    if(req.session.loggedIn) {
      let dbList = await db.get(`${req.session.name}.files`);
      let fileCount
      if(dbList) {
        fileCount = dbList.length;
      } else {
        fileCount = 0;
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
<body class="bg-neutral-700 flex">
    <div class="w-full flex flex-col h-screen overflow-y-hidden">

<nav class="bg-neutral-900">
  <div class="max-w-6xl mx-auto px-8">
    <div class="flex justify-between">

      <div class="flex space-x-4">

        <a class="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900" href="#">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;">
<path style="fill:#E8F4FC;" d="M426.667,256c0-94.257-76.41-170.667-170.667-170.667S85.333,161.743,85.333,256
	C38.206,256,0,294.206,0,341.333s38.206,85.333,85.333,85.333h341.333c47.128,0,85.333-38.206,85.333-85.333
	S473.794,256,426.667,256z"/>
<path style="fill:#D1E5F5;" d="M426.667,256c0-94.257-76.41-170.667-170.667-170.667v341.333h170.667
	c47.128,0,85.333-38.206,85.333-85.333S473.794,256,426.667,256z"/>
          </svg>
          <span class="hover:font-bold text-white ml-8">SimpleCloud</span>

        </a>

        <div class="hidden md:flex items-center space-x-1">
          <a class="py-5 px-2 hover:font-bold text-white" href="/upload">Upload</a>
          <a class="py-5 px-2 hover:font-bold text-white" href="/files">Files</a>
          <a class="py-5 px-2 hover:font-bold text-white" href="/cli">CLI</a>
        </div>
      </div>

      <div class="hidden md:flex items-center space-x-1">
        <a class="py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded shadow transition duration-300" href="/logout">Logout</a>
      </div>

      <div class="md:hidden flex items-center text-white">
        <button class="mobile-menu-button">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>


  <div class="mobile-menu hidden md:hidden">
    <a href="/upload" class="block py-4 px-4 text-sm text-white text-center">Upload</a>
    <a href="/files" class="block py-4 px-4 text-sm text-white text-center">Files</a>
    <a href="/cli" class="block py-4 px-4 text-sm text-white text-center">CLI</a>
    <a href="/logout" class="block py-4 px-4 text-sm text-white text-center">Logout</a>
  </div>
</nav>
        <div class="w-full overflow-x-hidden flex flex-col">
            <main class="w-full flex-grow p-6 mt-16">    
                <div class="flex flex-wrap">
                <div class="w-full md:w-1/4 xl:w-1/3 p-3">

                    <div class="bg-white border rounded shadow p-2">
                        <div class="flex flex-row items-center">
                            <div class="flex-1 text-right md:text-center">
                              <h5 class="font-bold uppercase text-gray-500">Username</h5>
                              <h3 class="font-bold text-3xl">${req.session.name}</h3>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="w-full md:w-1/4 xl:w-1/3 p-3">

                    <div class="bg-white border rounded shadow p-2">
                        <div class="flex flex-row items-center">
                            <div class="flex-1 text-right md:text-center">
                                <h5 class="font-bold uppercase text-gray-500">Uploaded file</h5>
                                <h3 class="font-bold text-3xl">${fileCount}</h3>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="w-full md:w-1/4 xl:w-1/3 p-3">

                    <div class="bg-white border rounded shadow p-2">
                        <div class="flex flex-row items-center">
                            <div class="flex-1 text-right md:text-center">
                                <h5 class="font-bold uppercase text-gray-500">Max file size</h5>
                                <h3 class="font-bold text-3xl">${config.MAX_SIZE}MB</h3>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <script src="/elements/dash.js"></script>
</body>
</html>`);
      res.end();
    } else {
      res.redirect("/login");
    }
  });
}
