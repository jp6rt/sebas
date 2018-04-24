const sebas = require('../src/sebas')
const http = require('http')
// const logger = (require('@jp6rt/cli-logger'))('Sebas [GET]', !0)
const { format } = require('@jp6rt/utils')

describe('Hello World!', () => {

	let statusCode, responseText = '', headers
	
	beforeAll(async (done) => {

		await sebas.start({ debugMode: !1, port: 8800 })

		sebas.get('/')
			.pipe((request, response) => {
				response.writeHead(200, {
					'Content-Type': 'text/plain'
				})
				response.end('Hello World!')
			})

		http.get('http://localhost:8800/', (response) => {

			statusCode = response.statusCode

			headers = response.headers
			
			response.on('data', (data) => {
				responseText += data.toString()
			})			

			response.on('end', () => {
				done()
			})
	
		})

	})

	afterAll(() => {
		sebas.stop()
	})

	it('should respond with code 200/OK', () => {
		expect(statusCode).toEqual(200)
	})

	it('should return the Server header', () => {
		expect( headers[ 'server' ] ).toEqual('Sebas/2.0')
	})

	it('should say Hello World', () => {
		expect(responseText).toEqual('Hello World!')
	})

})

describe('Route Parameters', () => {

	let statusCode, responseText = ''

	beforeAll(async (done) => {

		await sebas.start({ debugMode: !1, port: 8800 })

		sebas.get('/users/:id')
			.pipe((request, response) => {

				const { routeParams } = request

				response.writeHead(200, {
					'Content-Type': 'text/plain'
				})
				response.end(format('UserID:{0}', routeParams.id))
			})

		http.get('http://localhost:8800/users/123456', (response) => {

			statusCode = response.statusCode
			
			response.on('data', (data) => {
				responseText += data.toString()
			})			

			response.on('end', () => {
				done()
			})
	
		})

	})

	it('should respond with code 200/OK', () => {
		expect(statusCode).toEqual(200)
	})

	it('should say UserID:123456', () => {
		expect(responseText).toEqual('UserID:123456')
	})

})

describe('Bad Request', () => {

	let statusCode, responseText = ''

	beforeAll(async (done) => {

		await sebas.start({ debugMode: !1, port: 8800 })

		sebas.get('/bad')
			.pipe((request, response) => {

				response.writeHead(400, {
					'Content-Type': 'text/plain'
				})

				response.end(format('Bad request: {0}', request.url))
			})

		http.get('http://localhost:8800/bad', (response) => {

			statusCode = response.statusCode
			
			response.on('data', (data) => {
				responseText += data.toString()
			})			

			response.on('end', () => {
				done()
			})
	
		})

	})

	it('should respond with code 400/Bad Request', () => {
		expect(statusCode).toEqual(400)
	})

	it('should say Bad request: /bad', () => {
		expect(responseText).toEqual('Bad request: /bad')
	})

})