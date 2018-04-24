const sebas = require('./sebas')
const http = require('http')
const logger = (require('@jp6rt/cli-logger'))('Tests', !0)

;(async () => {

	sebas.get('/')
		.pipe('./', (request, response, next) => {
			logger.silent('Pre handler (get')
			next()
		})
		.pipe((request, response) => {
			response.end('Hello World!')
		})

	await sebas.start({ debugMode: !0, port: 3000 })

	http.get('http://localhost:3000', (response) => {
		logger.silent('response')
		sebas.stop()
	})
})()
