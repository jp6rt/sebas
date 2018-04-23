// const { METHOD_CONST } = require('../methods')
// const { format } = require('@jp6rt/utils')
const RequestHandler = require('./RequestHandler')
const { createServer } = require('http')
const clilogger = require('@jp6rt/cli-logger')

/**
 * handlers
 */
const { prefightHandler } = require('../handlers/preflight')
const { preloadHandler } = require('../handlers/preload')

/**
 * Class for Sebas
 */
const Sebas = class extends RequestHandler {
	constructor() {
		super()
		/**
		 * @property
		 * server instance
		 */
		this.server = createServer()
		this.server.on('connection', () => {
			// pending manage active connections
		})
		this.server.on('request', (request, response) => {
			this.handleRequest(request, response)
		})
		this.server.on('error', (error) => {
			throw new Error(error)
		})
	}
	attachDefaultHandlers(timeout) {
		// attach listeners
		this.insertHandler('all', '*', (request, response, next) => {
			request.setTimeout(timeout)
			next()
		}, 1)
		this.insertHandler(...prefightHandler, 1) //preflight
		this.insertHandler(...preloadHandler, 1) //preload
	}
	/**
	 * @method
	 * @param { object } config
	 * { port: number, timeout: number, debugMode: boolean }
	 * @returns { Promise }	
	 */
	start(config) {
		/**
		 * @property
		 * logger instance
		 */
		this.logger = clilogger('Sebas', config.debugMode)
		// attach default handlers (preload, preflight)
		this.attachDefaultHandlers( config.timeout || 30000)
		// insert application handlers
		this.insertQueuedHandlers()
		// resolve
		return new Promise((resolve) => {
			this.server.listen(config.port, () => {
				this.logger.accent('server has started on port: {0}', config.port)
				resolve(1)
			})
		})

	}
	/**
	 * @method
	 */
	stop() {
		this.server.unref()
	}	
}

module.exports = Sebas