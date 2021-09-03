const models = require('../models');

const loginSuccess = (req, res) => {

	res.send(`Welcome ${req.user.first_name} ${req.user.last_name} <a href = "http://localhost:8000/logout">logout</a <a href = "http://localhost:8000/addApplication"><add application/a>`);
	console.log("user", req.user);
}

const loginFail = (req, res) => {
	res.send("Failed");
}

const signIn = (req, res) => {
	res.send(`

			<!DOCTYPE html>
			<html>
			 
			<head>
			    <title></title>
			</head>
			 
			<body>
			    <form id="signin" name="signin" method="post" action="signin">
			        <label for="email">Email Address</label>
			        <input class="text" name="email" type="text" />
			        <label for="password">Password</label>
			        <input name="password" type="password" />
			        <input class="btn" type="submit" value="Sign In" />
			    </form>
			 
			</body>
			 
			</html>
		`)
}

const registerUser = (req, res) => {
	res.send(`

			<!DOCTYPE html>
			<html>
			 
			<head>
			    <title></title>
			</head>
			 
			<body>
			    <form id="signup" name="signup" method="post" action="/signup">
			    	<label for="username">User Name</label>
			        <input name="username" type="text" />
			        <label for="email">Email Address</label>
			        <input class="text" name="email" type="email" />
			        <label for="firstname">Firstname</label>
			        <input name="firstname" type="text" />
			        <label for="lastname">Lastname</label>
			        <input name="lastname" type="text" />
			        <label for="password">Password</label>
			        <input name="password" type="password" />
			        <input class="btn" type="submit" value="Sign Up" />
			    </form>
			 
			</body>
			 
			</html>
		`);
}

const logout = (req, res) => {
	req.session = null;
    req.logout();
    res.redirect('/');

}

module.exports = {

	loginSuccess,
	loginFail,
	registerUser,
	signIn,
	logout


}