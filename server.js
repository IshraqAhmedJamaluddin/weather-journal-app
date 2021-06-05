// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000
// Setup Server
app.listen(port, () => { console.log('Listening on http://localhost:8000') })

app.get('/weather', (req, res) => {
    res.send(projectData)
})

app.post('/weather', (req, res) => {
    projectData['temperature'] = req.body.temperature
    projectData['date'] = req.body.date
    projectData['user_response'] = req.body.user_response
})