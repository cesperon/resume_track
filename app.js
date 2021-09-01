const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('sequelize');
const db = require('./models');
var exphbs  = require('express-handlebars');
var compression = require('compression')
const bodyParser = require('body-parser');
var morgan = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./helpers/passport.js');
require('dotenv').config();

//passport
app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser({limit: '50mb'}));
app.use(morgan('combined'));


db.sequelize.sync().then(() => {
	
	app.listen(8000, (req, res) => {

		console.log('listening on port 8000')
	})

	require('./bootfiles/db')();
	require('./bootfiles/routes')(app);

	app.get("/", function(req, res) {
		return res.send(`
				<html>
					<head>
						<title>Resume Track</title>
						<link href="https://fonts.googleapis.com/css?family=Berkshire+Swash&display=swap" rel="stylesheet" />
					</head>
					<body style="height: 90%; display: flex; align-items: center; justify-content: center;">
						<h1 style="text-align: center; font-size: 80px; letter-spacing: 3px; color: #006400; font-family: 'Berkshire Swash', cursive; margin: 0;">Resume-Track</h1>
						<a href = "http://localhost:8000/google">google sign</a>
						<a href = "http://localhost:8000/register">sign-up</a>
					</body>
				</html>
			`);
	});

	app.get('*', (req, res) => {

		res.send(`
				<html>
					<head>
						<title>Resume Track</title>
						<link href="https://fonts.googleapis.com/css?family=Berkshire+Swash&display=swap" rel="stylesheet" />
					</head>
					<body style="height: 70%; display: flex; align-items: center; justify-content: center;">
						<h1 style="text-align: center; font-size: 50px; letter-spacing: 3px; color: #FF5733; font-family: 'Berkshire Swash', cursive; margin: 0;">404 Error Page Does Not Exist</h1>
						<a href = "http://localhost:8000">back to home page</a>
					</body>
				</html>
		
			`);

	});

	
});

