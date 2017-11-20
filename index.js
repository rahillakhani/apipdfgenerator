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
	res.send('Welcome to PDF Generator');
	res.send('Node, html-pdf and express with Vanilla JS');
	res.send('for EmailPDF /generate?param=paramValue');
	res.send('for IdCardPDF /id?param=paramValue');
	res.send('contact github:rahillakhani email:lakhani.rj@gmail.com');
});

app.post('/generate', (req,res) => {
	res.setHeader('Content-type', 'application/pdf');
	res.setHeader('Content-disposition', 'attachment; filename=printRegisteration.pdf');	
	generatePDF(req, res, 'email');
});

app.post('/id', (req,res) => {
	res.setHeader('Content-type', 'application/pdf');
	res.setHeader('Content-disposition', 'attachment; filename=printID.pdf');
	generatePDF(req, res, 'id');
});

app.listen(port, (req,res) => {
	console.log('started at ', port);
});