var express = require('express');
var app = express();
var bodyParser = require('body-parser');

let generatePDF = require('./generatePDF.js');
port = 3000;

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
	// res.send(req.query)

});

app.listen(port, (req,res) => {
	console.log('started at ', port);
});

// function generatePDF(req, res) {
	// doc.addPage();
	// doc.circle(100, 50, 50)
	// 	.lineWidth(3)
	// 	.fillOpacity(0.8)
	// 	.fillAndStroke("red", "#900")
	// doc.pipe(res);
	// doc.end();
	// res.send('pdf');
// }