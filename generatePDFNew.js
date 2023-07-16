var html_to_pdf = require('html-pdf-node');
let options = { format: 'A4' };
var fs = require('fs');
var path = require('path');
const imageToUri = require('image-to-uri');

// let file = { url: "http://localhost:8080/cheq-printed-template.html" };

var generateNewPDF = (req, res, flag) => {
	const dt = new Date();
	const { name, check_number, date, payee_name, amount, bank_address, memo, signature, ocr } = req.query;
	const splitAdd = bank_address.split(',');
	let setAddress = ""
	splitAdd.map(((el, i) => {
		setAddress = `${setAddress}${i !== 0 ? "," : ""}<br />${el}`;
	}))
	console.log("splitAdd", splitAdd);

	var template = fs.readFileSync(path.resolve(__dirname + `/${flag}-template.html`), 'utf-8')
		.replace('[LOGOURL]', imageToUri('./Encore-Tech-Inc-Footer-Logo-300x138-1.png'))
		.replace('[NAME]', name)
		.replace('[CHECKNUM]', check_number)
		.replace('[DATE]', date)
		.replace('[PAYEENAME]', payee_name)
		.replace('[AMOUNT]', amount)
		.replace('[BANK_ADDRESS]', setAddress)
		.replace('[MEMO]', memo)
		.replace('[SIGNATURE]', signature)
		.replace('[OCR]', ocr);
	let file = { content: template };

	html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
		console.log("PDF Buffer:-", pdfBuffer);
		// pdfBuffer.pipe(res);
		res.write(pdfBuffer, 'binary');
		res.end(null, 'binary');
	});
}
module.exports = generateNewPDF;