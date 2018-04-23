exports.prefightHandler = ['options', '*', (request, response, next) => {
	response.writeHead(200, {
		'Allow': 'GET, POST, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*'
	})
	response.end()
}]