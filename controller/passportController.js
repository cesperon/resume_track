const models = require('../models');

const loginSuccess = (req, res) => {

	res.send(`Welcome ${req.user.given_name} ${req.user.family_name} <a href = "http://localhost:8000/logout">logout</a>`);
	console.log(req.user);
}

const loginFail = (req, res) => {

	res.send("Failed");
}

const registerUser = (req, res) => {

	res.send(`

			<form>
				<label>first name</label>
				<input type=text name="first_name">
			</form>
		`);
}

const callDb = async(req, res) => {

}

module.exports = {

	loginSuccess,
	loginFail,
	registerUser


}