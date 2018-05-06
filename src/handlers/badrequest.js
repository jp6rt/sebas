const RESPONSE_CODES = require('../enums/response_code')
const { format } = require('@jp6rt/utils')

exports.badRequestHandler = ['all', '*', (request, response) => {
	response.writeHead(RESPONSE_CODES.Timeout, () => {
		'Content-Type', 'text/plain'
	})
	response.end(format('Bad Request {0}', request.url))
}]