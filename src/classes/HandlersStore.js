const { format } = require('@jp6rt/utils')
const RouteHandler = require('./RouteHandler')
const { matchPath } = require('../path')

/**
 * @class
 */
const HandlersStore = class {
	/**
	 * @constructor
	 */
	constructor(){
		/**
		 * @property
		 * Supported HTTP method
		 */
		this.supportedMethods = new Set(['ALL', 'OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'])
		/**
		 * @property
		 * Holds all handlers for options request
		 */
		this[Symbol.for('OPTIONS')] = []
		/**
		 * @property
		 * Holds all handlers for get request
		 */
		this[Symbol.for('GET')] = []
		/**routeHandler.path
		 * @property
		 * Holds all handlers for post request
		 */
		this[Symbol.for('POST')] = []
		/**
		 * @property
		 * Holds all handlers for put requestrouteHandler.path
		 */
		this[Symbol.for('PUT')] = []
		/**
		 * @property
		 * Holds all handlers for delete request
		 */
		this[Symbol.for('DELETE')] = []
		/**
		 * @property
		 * we keep track of positions of handlers (order matters)
		 */
		this.index = -1
		/**
		 * @property
		 * all handlers are cached so we won't need to re-caculate the handlers
		 */
		this.handlersCache = new Map
		/**
		 * Add a counter for all core handlers, return 0 handlers on retrieve operation
		 * if app hander was added
		 * This allows sebas to determine if its a bad request (=no app handlers)
		 */
		this.coreHandlersCount = 0
	}
	/**
	 * @method
	 * @param { string } method 
	 * @param { string } routepath 
	 * @param { function } handler 
	 * @param { boolean } core
	 */
	insertHandler(method, routepath, handler, core) {

		if ( core )
			++this.coreHandlersCount

		// some logging
		// const logger = (require('@jp6rt/cli-logger'))('HandlersStore (insertHandler)', !0)
		// logger.error('method: {0}, routepath: {1}, handler: {2}', method, routepath, handler)

		// always evalute the method in upper case
		method = method.toUpperCase()
		// throw an error for non supported method
		if (!this.supportedMethods.has(method)) {
			throw new Error(format('The method \'{0}\' is not supported', method))
		}
		if ( method === 'ALL') {
			this.supportedMethods.forEach(value => {
				value !== 'ALL' && this[Symbol.for(value)].push(new RouteHandler(routepath, ++this.index, handler))
			})
		} else this[Symbol.for(method)].push(new RouteHandler(routepath, ++this.index, handler))
	}
	/**
	 * 
	 * @param {*} method 
	 * @param {*} reqPath 
	 * @param {*} hash 
	 */
	retrieveHandlers(method, reqPath, hash) {

		// always evalute the method in uppercase
		method = method.toUpperCase()

		// fetch handlers from cache
		// if not cached, recalculate handlers


		// some logging
		// const logger = (require('@jp6rt/cli-logger'))('HandlersStore (retrieveHandlers)', !0)

		if (this.handlersCache.get(hash)) {
			// logger.silent('get from cache - hash: {0}, reqPath: {1}', hash, reqPath)
			return this.handlersCache.get(hash)
		} else {
			// logger.silent('recalculate handlers - hash: {0}, reqPath: {1}', hash, reqPath)
			// match and filter the right handlers for the path
			const handlers = this[Symbol.for(method)]		
				//  routeHandler - is an instance of RouteHandler
				.filter(routeHandler => matchPath(routeHandler.path, reqPath))

			/**	will revisit this in the future
			// if the same counts as core handlers, then no app handler was added then treat as bad request
			this.coreHandlersCount === handlers.length && (handlers.badRequest = !0)
			*/

			this.handlersCache.set(hash, handlers)
			
			return handlers
		}
	}
}

module.exports = HandlersStore