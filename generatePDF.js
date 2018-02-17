var pdf = require('html-pdf');
var fs =require('fs');
var path = require('path');


const options = {
	"format": "Letter",
	"orientation": "portrait",
	"border": "0.2",  
};

// var generatePDF = (req, res, flag) => {
// 	var data = req.query;
// 	var String = `name is ${data.name} uuid is ${data.uuid} from  ${data.Center} ${data.Regional} ${data.Local} `
// 	var template = fs.readFileSync(path.resolve(__dirname + `/${flag}-template.html`), 'utf-8').replace('[FULLNAME]', data.Name)
// 	.replace('[CENTER]', data.Center)
// 	.replace('[REGIONAL]', data.Regional)
// 	.replace('[LOCALBOARD]', data.Local)
// 	.replace('[BARCODE]', data.Barcode)
// 	.replace('[USER]', data.Image)
// 	.replace('[PATICIPANT_TYPE]', data.ParticipantType)
// 	.replace('[DOB]', data.dob)
// 	.replace('[FULLNAME]', data.Name)
// 	.replace('[EMERGENCY_CONTACT]', data.emergency)
// 	.replace('[YOURNAME]', data.Name);
// 	pdf.create(String, options).toStream(function (err, stream) {
// 		stream.pipe(res);
// 	});
// }

var generatePDF = (req, res, flag) => {
	var data = req.query;
	var location = req.headers.host;
	
	var template = fs.readFileSync(path.resolve(__dirname + `/${flag}-template.html`), 'utf-8')
		.replace('[VOL_NAME]', data.name)
		.replace('[VOL_DOB]', data.dob)
		.replace('[VOL_CONTACT]', data.contact)
		.replace('[VOL_EMERGENCY]', data.emergency)
		.replace('[VOL_PHOTO]', data.photo)
		.replace('[VOL_UUID]', data.uuid)
		.replace('[VOL_BARCODE]', data.barcode)
		.replace('[VOL_DEPT]', ('<span>' + data.dept.split('').join('</span><span>') + '</span>'))
		.replace('[VOL_SUBDEPT]', data.subdept)
		.replace('[VOL_LEVEL]', data.level)
		.replace('[VOL_JK]', data.jk)
		.replace('[VOL_CO]', data.co)
		.replace('[VOL_RG]', data.re)
		.replace('[PATH]',location);

	pdf.create(template, options).toStream(function (err, stream) {
		stream.pipe(res);
	});
}

module.exports = generatePDF;

//localhost:8080/id?name=something someone&dob=31-05-1991&contact=9160697551&emergency=0909090990&photo=https://doc-00-0s-docs.googleusercontent.com/docs/securesc/4p371mb5tomkrp7hfutkls4ukc2e9cvk/r3qh7i4vpqf20ipht575p69of6lia91u/1518624000000/10019995634046694382/17408580162042439282/19ckjVxgm9NiaOmKNZUdjLzXnrlLKySN-?e=view&uuid=SHW310591ARIF697551&dept=security&subdept=frisking&level=L2&jk=PV&co=Pune&re=WI