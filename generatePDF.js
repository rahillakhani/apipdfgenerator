var pdf = require('html-pdf');
var fs =require('fs');
var path = require('path');


const options = {
	"format": "Letter",
	"orientation": "portrait",
	"border": "0.2",  
};

var generatePDF = (req, res, flag) => {
	var data = req.query;
	var template = fs.readFileSync(path.resolve(__dirname + `/${flag}-template.html`), 'utf-8').replace('[FULLNAME]', data.Name)
	.replace('[CENTER]', data.Center)
	.replace('[REGIONAL]', data.Regional)
	.replace('[LOCALBOARD]', data.Local)
	.replace('[BARCODE]', data.Barcode)
	.replace('[USER]', data.Image)
	.replace('[PATICIPANT_TYPE]', data.ParticipantType)
	.replace('[DOB]', data.dob)
	.replace('[FULLNAME]', data.Name)
	.replace('[EMERGENCY_CONTACT]', data.emergency)
	.replace('[YOURNAME]', data.Name);
	pdf.create(template, options).toStream(function (err, stream) {
		stream.pipe(res);
	});
}

module.exports = generatePDF;