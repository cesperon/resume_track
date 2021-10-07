const isLoggedIn = (req, res, next) => {
    if (req.user) {
        // console.log('user', req.user);
        // console.log('session', req.session);
        // req.session.uid = req.user.id;
        // console.log('new_session', req.session);
        next();
    } else {
        res.send(`401<h1>Must Login<h1/> <a href="http://localhost:8000">hompage<a/>`);
    }
};

module.exports = {
	isLoggedIn
}