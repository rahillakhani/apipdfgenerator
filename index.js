var express = require('express');
var app = express();
var bodyParser = require('body-parser');

let generatePDF = require('./generatePDF.js');
var port = process.env.PORT || 8080;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('elo')
});

app.post('/generate', (req,res) => {
	res.setHeader('Content-type', 'application/pdf');
	generatePDF(req, res);
});

app.listen(port, (req,res) => {
	console.log('started at ', port);
});