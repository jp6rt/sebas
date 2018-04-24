exports.preloadHandler = ['all', '*', (request, response, next) => {
	response.setHeader('Server', 'Sebas2')
	next()
}]