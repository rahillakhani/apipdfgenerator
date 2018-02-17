var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var html2png = require('html2png');
let generatePDF = require('./generatePDF.js');
const phantom = require('phantom');
var port = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(express.static('img'));

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

app.get('/darbarID', (req,res) => {
	var screenshot = html2png({ width: 1280, height: 720, browser: 'phantom' });
	screenshot.render('<b>Hello</b>', function (err, data) {
		// If there is an error close the web browser first before calling the
		// errback
		if (err) return screenshot.error(err, cb);

		// data will contain a screenshot of the HTML as a node.js Buffer
		res.send(data);
		console.log(data);
		//<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 02 80 ...>

		// Close the web browser (phantomjs or chrome)
		screenshot.close(done);
	});

	// res.sendFile(__dirname+'/index.html');
});

app.listen(port, (req,res) => {
	console.log('started at ', port);
});