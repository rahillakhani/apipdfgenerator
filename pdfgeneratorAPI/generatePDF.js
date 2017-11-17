// PDFDocument = require('pdfkit');

// let doc = new PDFDocument;
var pdf = require('html-pdf');

var html = `<pre>something</pre>`

const options = {
	"format": "Letter",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
	"orientation": "portrait",
	"border": "0.2",  
};


var generatePDF = (req,res) => {
	console.log(req.query);
	var data = req.query;
	var html = '<table>'
	for (var key in data)
		html = html + `<tr><td>${key} </td><td>${data[key]}</td></tr>`

	html = html+ '</table>'

	pdf.create(`<div>${html}</div>`, options).toStream(function (err, stream) {
		stream.pipe(res);
	});

	return true;
}


module.exports = generatePDF;
