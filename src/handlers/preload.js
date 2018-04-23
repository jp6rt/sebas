exports.preloadHandler = ['all', '*', (request, response, next) => {
	request.setHeader('Server', 'Sebas2')
	next()
}]