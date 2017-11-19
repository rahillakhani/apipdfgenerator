var pdf = require('html-pdf');
var fs =require('fs');
var path = require('path');


const options = {
	"format": "Letter",
	"orientation": "portrait",
	"border": "0.2",  
};

var generatePDF = (req, res) => {
	var data = req.query;
	var template = fs.readFileSync(path.resolve(__dirname + '/email-template.html'), 'utf-8').replace('[FULLNAME]', data.Name)
	.replace('[CENTER]', data.Center)
	.replace('[REGIONAL]', data.Regional)
	.replace('[LOCALBOARD]', data.Local)
	.replace('[BARCODE]', data.Barcode)
	.replace('[USER]', data.Image)
	.replace('[PATICIPANT_TYPE]', data.ParticipantType)
	.replace('[DOB]', data.dob)
	.replace('[FULLNAME]', data.Name)
	.replace('[YOURNAME]', data.Name);
	pdf.create(template, options).toStream(function (err, stream) {
		stream.pipe(res);
	});
	// return true;
}


module.exports = generatePDF;
