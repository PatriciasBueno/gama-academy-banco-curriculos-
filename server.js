require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.APP_PORT
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const {MongoClient} = require("mongodb");
connectionString = 'mongodb+srv://'+process.env.DB_NAME+':'+process.env.DB_SECRET+'@cluster0.sqf3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Handlers
app.use(bodyParser.urlencoded({extended: true}))
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

MongoClient.connect(connectionString, {useUnifiedTopology: true})
	.then(client => {
		console.log('Connected to Database')
		const db = client.db('storage')
		require('./endpoints')(app, db)
	})
	.catch(error => console.error(error))


// Assets
app.get('/index.js', (req, res) => {
	res.sendFile(__dirname + '/index.js')
})
app.get('/index.css', (req, res) => {
	res.sendFile(__dirname + '/index.css')
})

// Listening
app.listen(port, function () {
	console.log(`Example app listening at http://localhost:${port}`)
})
