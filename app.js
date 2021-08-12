const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('sequelize');
const db = require('./models');
var exphbs  = require('express-handlebars');
var compression = require('compression')
const bodyParser = require('body-parser');
var morgan = require('morgan')


app.use(bodyParser({limit: '50mb'}));
app.use(morgan('combined'))

db.sequelize.sync().then(() => {
	
	app.listen(8000, (req, res) => {

		console.log('listening on port 20888')
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
					</body>
				</html>
			`);
	});
	
});

// const db = new sequelize('postgres', 'postgres', '5432', {

// 	host:'localhost',
// 	dialect: 'postgres',
// 	operatorsAliases: false,

// 	pool: {

// 		max: 5,
// 		min: 0,
// 		acquire: 30000,
// 		idle: 10000

// 	},
// });

// db.authenticate()
// .then(() => console.log('Database connected...'))
// .catch(err => console.log('Error:' + err))