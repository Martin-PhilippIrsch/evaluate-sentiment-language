var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');
const aylien = require("aylien_textapi");

var PORT = 3000;

// webpack middleware development
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');


// const aylienAPIResponse = require('./aylienAPI.js')

//environment variables
const dotenv = require('dotenv');
dotenv.config();

console.log(`Your API key is ${process.env.API_KEY}`);


const app = express()

// development!
const config = require('../../webpack.dev');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));

app.use(cors())
    // to use json
app.use(bodyParser.json())
    // to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))

// Aylien API
const aylienTextAPI = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
})

app.post('/phrase', (req, res) => {
    console.log('Aylien API request for phrase');
    console.log(req.body.text);
    aylienTextAPI.sentiment({
        'text': req.body.text
    }, function(error, response) {
        if (error === null) {
            console.log(response);
            res.send(response);
        }
    })

})

app.post('/lang', (req, res) => {
    console.log('Aylien API request for Language');
    console.log(req.body.text);
    aylienTextAPI.language({
        'text': req.body.text // req.body
    }, function(error, response) {
        if (error === null) {
            console.log(response);
            res.send(response);
        }
    })

})

// designates what port the app will listen to for incoming requests
app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`)
})