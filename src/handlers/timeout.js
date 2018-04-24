const RESPONSE_CODES = require('../enums/response_code')

exports.timeoutHandler = ['all', '*', (request, response) => {
	response.writeHead(RESPONSE_CODES.Timeout, () => {
		'Content-Type', 'text/plain'
	})
	response.end('Server timeout.')
}]