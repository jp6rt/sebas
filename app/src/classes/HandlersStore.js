const { format } = require('../common')
const RouteHandler = require('./RouteHandler')

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
		this.supportedMethods = new Set(['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'])
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
		this.handlerCount = -1
	}
	/**
	 * @method
	 * @param { string } method 
	 * @param { string } hashedpath 
	 * @param { function } handler 
	 */
	insertHandler(method, hashedpath, handler) {
		// always evalute the method in upper case
		method = method.toUpperCase()
		// throw an error for non supported method
		if (!this.supportedMethods.has(method)) {
			throw new Error(format('The method \'{0}\' is not supported', method))
		}
		this[Symbol.for(method)].push(new RouteHandler(hashedpath, ++this.handlerCount, handler))
	}
}

module.exports = HandlersStore