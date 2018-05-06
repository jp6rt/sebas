const RequestHandler = require('./RequestHandler')
const { createServer } = require('http')
const clilogger = require('@jp6rt/cli-logger')
const { SERVER_STATE } = require('../enums/server_state')

/**
 * handlers
 */
const { prefightHandler } = require('../handlers/preflight')
const { preloadHandler } = require('../handlers/preload')
const { timeoutHandler } = require('../handlers/timeout')

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
			this.execRouteHandlers(request, response)
		})
		this.server.on('error', (error) => {
			throw new Error(error)
		})
	}
	attachDefaultHandlers(timeout) {
		// attach listeners
		// timeout listener but currently the callback is not invoked
		this.insertHandler('all', '*', (request, response, next) => {
			request.setTimeout(timeout, () => {
				// this callback is not invoked.
				this.logger.error('timeout: run timeout handler')
				this.handleSingleRequest(request, response, timeoutHandler[2])
			})
			next()
		}, 1)
		// core listeners
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
		this.attachDefaultHandlers( config.timeout || 5000)
		// insert application handlers
		this.insertQueuedHandlers()
		// resolve
		return new Promise((resolve) => {
			this.server.listen(config.port, () => {
				this.serverState = SERVER_STATE.Started
				this.logger.accent('server has started on port: {0}', config.port)
				resolve(1)
			})
		})

	}
	/**
	 * @method
	 */
	stop() {
		this.serverState = SERVER_STATE.Stopped
		this.server.unref()
	}	
}

module.exports = Sebas