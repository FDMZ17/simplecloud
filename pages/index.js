module.exports.load = async function (app, db, dirls) {
    app.get("/", async (req, res) => {
        const dbList = await db.all();
        let userCount;
        if (dbList) {
            userCount = dbList.filter(e => e !== 'data').length;
        } else {
            userCount = 0;
        }
        const fileLs = dirls();
        res.send(`<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Simple cloud</title>
        <link href="/elements/style.css" rel="stylesheet" />
    </head>

    <body class="bg-neutral-800">
        <div class="p-5 mx-auto mt-16 max-w-2xl rounded shadow-sm">
            <h2 class="px-4 text-4xl text-center text-white">Simple cloud | Free file upload server </h2>
            <div class="flex flex-row justify-center items-center mt-14 ml-8">
                <a href="/login"
                    class="px-4 py-2 mr-4 text-xl text-center text-white bg-sky-500 rounded-lg border-2 border-sky-500 hover:bg-neutral-800 hover:text-sky-500 sm:ml-2">Login</a>
                <a href="/register"
                    class="px-4 py-2 mr-4 text-xl text-center text-white bg-green-500 rounded-lg border-2 border-green-500 hover:bg-neutral-800 hover:text-green-500 sm:ml-2">Register</a>
            </div>
            <div class="flex-grow p-6 mt-16 w-full">
                <div class="flex flex-wrap">
                    <div class="p-3 w-full md:w-1/4 xl:w-1/2">
                        <div class="p-2 bg-white rounded border shadow">
                            <div class="flex flex-row items-center">
                                <div class="flex-1 text-right md:text-center">
                                    <h5 class="font-bold text-gray-500 uppercase">Usercount</h5>
                                    <h3 class="text-3xl font-bold">${userCount}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-3 w-full md:w-1/4 xl:w-1/2">
                        <div class="p-2 bg-white rounded border shadow">
                            <div class="flex flex-row items-center">
                                <div class="flex-1 text-right md:text-center">
                                    <h5 class="font-bold text-gray-500 uppercase">Filecount</h5>
                                    <h3 class="text-3xl font-bold">${fileLs.length}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>

</html>`);
    });
};