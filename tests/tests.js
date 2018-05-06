const sebas = require('../src/sebas')
const http = require('http')
const logger = (require('@jp6rt/cli-logger'))('Tests', !0)
const { format } = require('@jp6rt/utils')

;(async () => {

	sebas.get('/')
		.pipe('./', (request, response, next) => {
			logger.silent('Pre handler (get)')
			next()
		})
		.pipe((request, response) => {
			response.end('Hello World!')
		})

	sebas.get('/users')
		.pipe('./*', (request, response, next) => {
			logger.silent('Pre handler (get:/users)')
			response.setHeader('Content-Type', 'text/plain')
			next()
		})
		.pipe('./:id', (request, response) => {

			const { routeParams } = request
			logger.silent('routeParams: {0}', routeParams)
			response.end(format('Hello UserID:{0}', routeParams.id))

		})

	sebas.get('/info')
		.pipe('./id/:id/type/:type', (request, response) => {

			const { routeParams } = request

			logger.silent('routeParams: {0}', routeParams)			

			response.writeHead(200, {
				'Content-Type': 'text/html'
			})

			response.write(format('<p>id: {0}<p>', routeParams.id))
			response.write(format('<p>type: {0}</p>', routeParams.type))
			response.end()

		})
	
	sebas.get('/view/sub')
		.pipe((request, response) => {

			response.writeHead(200, {
				'Content-Type': 'text/html'
			})

			response.end('Hello /view/sub')

		})

	await sebas.start({ debugMode: !0, port: 3000 })

	http.get('http://localhost:3000', (response) => {

		const { headers }= response

		logger.silent('response headers: {0}', headers)

		response.on('data', (data) => {
			logger.primary('response data: {0}', data.toString())
		})

		// sebas.stop()
	})
	
	http.get('http://localhost:3000/users/1', (response) => {

		const { headers }= response

		logger.silent('response headers: {0}', headers)

		response.on('data', (data) => {
			logger.primary('response data: {0}', data.toString())
		})

	})

	http.get('http://localhost:3000/info/id/123456/type/ad', (response) => {

		const { headers }= response

		logger.silent('response headers: {0}', headers)

		response.on('data', (data) => {
			logger.primary('response data: {0}', data.toString())
		})

	})

	http.get('http://localhost:3000/view/sub', (response) => {

		response.on('data', (data) => {
			logger.primary('response data: {0}', data.toString())
		})

	})

})()
