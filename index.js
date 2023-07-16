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
	res.send('Welcome to PDF Generator <br> Node, html-pdf and express with Vanilla JS<br> for EmailPDF /generate?param=paramValue<br> for IdCardPDF /id?param=paramValue <br> contact github:rahillakhani email:lakhani.rj@gmail.com');
});

app.post('/generate', (req,res) => {
	res.header('Content-type', 'application/pdf');
	res.header('Content-Disposition', 'attachment; filename="printRegisteration.pdf"');	
	generatePDF(req, res, 'email');
});

app.post('/id', (req,res) => {
	res.header('Content-type', 'application/pdf');
	res.header('Content-Disposition', 'attachment; filename="printID.pdf"');
	generatePDF(req, res, 'id');
});


app.post('/cheqprinted', (req,res) => {
	res.header('Content-type', 'application/pdf');
	res.header('Content-Disposition', 'attachment; filename="checkprintedencore.pdf"');
	generatePDF(req, res, 'cheq-printed');
});

app.listen(port, (req,res) => {
	console.log('started at ', port);
});