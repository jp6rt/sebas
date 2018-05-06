exports.preloadHandler = ['all', '*', (request, response, next) => {
	response.setHeader('Server', 'Sebas/2.0')
	next()
}]