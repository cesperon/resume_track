const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.send(`401<h1>Must Login<h1/> <a href="http://localhost:8000">hompage<a/>`);
    }
};

module.exports = {
	isLoggedIn
}