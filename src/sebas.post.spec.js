const sebas = require('../src/sebas')
const http = require('http')
const logger = (require('@jp6rt/cli-logger'))('Sebas [POST]', !0)
const { format } = require('@jp6rt/utils')

describe('POST credentials', () => {

	let statusCode, responseText = '', headers

	beforeAll(async (done) => {

		await sebas.start({ debugMode: !1, port: 8800 })

		sebas.post('/login')
			.pipe((request, response) => {

				// logger.primary('POST request handler')

				response.writeHead(200, {
					'Content-Type': 'application/json'
				})
				
				request.on('data', (data) => {
					response.end(data.toString())
				})

			})

		const postRequest = http.request({
			hostname: 'localhost',
			port: 8800,
			method: 'POST',
			path: '/login',
			headers: {
				'Content-Type': 'application/json'
			}
		}, (response) => {

			statusCode = response.statusCode
			headers = response.headers

			// logger.accent('headers: {0}', headers)
			
			response.on('data', (data) => {
				responseText += data.toString()
			})			

			response.on('end', () => {
				done()
			})
			
		})

		postRequest.write('{"username":"joey", "password":"test"}')
		postRequest.end()
	})

	afterAll(() => {
		sebas.stop()
	})

	it('should return 200/OK', () => {

		expect(statusCode).toEqual(200)

	})

	it('should return a json header', () => {

		expect(headers[ 'content-type' ]).toEqual('application/json')

	})

	it('should return the credentials', () => {

		// logger.primary('responseText: {0}', responseText)

		expect(JSON.parse(responseText)).toEqual({'username':'joey', 'password':'test'})

	})


})