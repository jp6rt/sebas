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
		/**
		 * @property
		 * Holds all handlers for post request
		 */
		this[Symbol.for('POST')] = []
		/**
		 * @property
		 * Holds all handlers for put request
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
	}
	/**
	 * @method
	 * @param { string } method 
	 * @param { string } routepath 
	 * @param { function } handler 
	 */
	insertHandler(method, routepath, handler) {

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
	retrieveHandlers(method, reqPath) {
		// always evalute the method in uppercase
		method = method.toUpperCase()
		// match and filter the right handlers for the path
		const handlers =  this[Symbol.for(method)]		
			//  routeHandler - is an instance of RouteHandler
			.filter(routeHandler => {
				// path matching logic here
				return true
			})
		return handlers
	}
}

module.exports = HandlersStore