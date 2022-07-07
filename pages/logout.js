module.exports.load = async function (app, db) {
    app.get('/logout', async (req, res) => {
        if (req.session.loggedIn) {
            delete req.session.loggedIn;
            res.redirect("/")
        } else {
            res.redirect("/login");
        }
    });
}