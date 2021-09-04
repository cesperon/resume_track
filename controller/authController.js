const models = require('../models');

const loginSuccess = (req, res) => {

	res.send(`Welcome ${req.user.first_name} ${req.user.last_name} <a href = "http://localhost:8000/logout">logout</a> <a href = "http://localhost:8000/application/add">add application</a>`);
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

const addApp = (req, res) => {

	res.send(`

			<!DOCTYPE html>
			<html>
			 
			<head>
			    <title></title>
			</head>
			 
			<body>
			    <form id="addapp" name="addapp" method="post" action="/applications/add">
			    	<label for="company_name">company name</label>
			        <input name="company_name" type="text" />
			        <br>
			        <label for="position">position name</label>
			        <input name="position" type="text" />
			        <br>
			        <label for="hiring_manager">hiring manager</label>
			        <input name="hiring_manager" type="text" />
			        <br>
			        <label for="date_applied">date applied</label>
			        <input name="date_applied" type="date" />
			        <br>
			        <label for="platform">platform</label>
			        <input name="platform" type="text"/>
			        <br>
			        <label for="tech_stack">tech stack</label>
			        <input name="tech_stack" type="text"/>
			        <br>
			        <label for="status">application status</label>
			        <input name="status" type="text"/>
			        <br>
			        <label for="compensation">compensation</label>
			        <input name="compensation" type="text"/>
			        <br> 
			        <label for="experience">years of experience</label>
			        <input name="experience" type="text"/>
			        <br>
			        <label for="location">company location</label>
			        <input name="location" type="text"/>
			        <br>
			        <label for="state">company state</label>
			        <input name="state" type="text"/>
			        <br>
			        <label for="equity">Equity:</label>
				    <select name="equity" id="equity">
				      <option value="1">True</option>
				      <option value="0">False</option>
				    </select>
				    <br>
				    <label for="salary">Salary:</label>
				    <select name="salary" id="salary">
				      <option value="1">True</option>
				      <option value="0">False</option>
				    </select>
				    <br>
				    <label for="four_0_one">401k:</label>
				    <select name="four_0_one" id="four_0_one">
				      <option value="1">True</option>
				      <option value="0">False</option>
				    </select>
				    <br>
				    <label for="remote">remote:</label>
				    <select name="remote" id="remote">
				      <option value="1">True</option>
				      <option value="0">False</option>
				    </select>
				    <br>
				    <textarea id="description" name="description" rows="4" cols="50">
				    </textarea>
				    <br>
				    <label for="links">links</label>
			        <input name="links" type="text"/>
			        <br>
			        <input class="btn" type="submit" value="add application" />
			    </form>
			 
			</body>
			 
			</html>
		`)
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
	logout,
	addApp


}