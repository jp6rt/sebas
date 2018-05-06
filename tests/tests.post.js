const sebas = require('../src/sebas')
const logger = (require('@jp6rt/cli-logger'))('Sebas [post-test]', !0)

;(async () => {
	await sebas.start({ debugMode: !0, port: 8800 })

	sebas.post('/login')
		.pipe((request, response) => {

			logger.primary('POST request handler')

			response.writeHead(200, {
				'Content-Type': 'application/json'
			})
			
			request.on('data', (data) => {
				response.end(data.toString())
			})

		})
})()