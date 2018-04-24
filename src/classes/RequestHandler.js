const { format } = require('@jp6rt/utils')
const { validPath, normalize } = require('../path')
const Route = require('./Route')
const HandlersStore = require('./HandlersStore')
const HashedStore = require('sb-hashedstore')
const { SERVER_STATE } = require('../enums/server_state')

const RequestHandler = class {
	constructor() {
		/**
		 * @property { HandlersStore } handlerStore
		 */
		this.handlersStore = new HandlersStore
		/**
		 * @property { HashedStore } hashedStore
		 */
		this.hashedStore = new HashedStore
		// All handlers are not inserted to the stack directly if sebas is not ready to take app handlers
		// they will be inserted on a queue and attach once the prehandlers is ready
		this.serverStarted = SERVER_STATE.NotStarted
		this.pendingHandlers = []
	}
	/**
	 * @method
	 * @param { string } method 
	 * @param { string } routepath 
	 * @param { function } handler 
	 * @param { boolean } override
	 * this parameter should not be used by the application and should only be used internally
	 */
	insertHandler(method, routepath, handler, override) {
		if (this.serverStarted || override)
			this.handlersStore.insertHandler(method, routepath, handler)
		else 
			this.pendingHandlers.push([method, routepath, handler])
	}
	insertQueuedHandlers() {
		for (var h in this.pendingHandlers)
			this.handlersStore.insertHandler(...this.pendingHandlers[h])
	}
	/**
	 * @method
	 * @param { string } method
	 * @param { string } routepath 
	 * @param { function } handler
	 * @returns { Route } 
	 */
	route(method, routepath, handler){
		if (!validPath(routepath))
			throw new Error(format('The path \'{0}\' you provided is not valid', routepath))
		routepath = normalize(routepath)
		return new Route(method, routepath, handler)
	}
	/**
	 * @method
	 * @param { string } method
	 * @param { string } routepath 
	 * @param { function } handler
	 * @returns { Route } 
	 */
	options(routepath, handler){
		return this.route('OPTIONS', routepath, handler)
	}
	get(routepath, handler){
		return this.route('GET', routepath, handler)
	}
	post(routepath, handler){
		return this.route('POST', routepath, handler)
	}
	put(routepath, handler){
		return this.route('PUT', routepath, handler)
	}
	delete(routepath, handler){
		return this.route('DELETE', routepath, handler)
	}
	handleRequest(request, response) {

		const { method, url } = request
		const handlers = this.handlersStore.
			retrieveHandlers(method, url, this.hashedStore.hash(url)).
			slice() // slice to make sure we are CLONING the handlers

		// create an iterant and iterate the handlers array

		const next = () => {
			const handler = handlers.shift()
			handler.handler(request, response, next.bind(this))
		}

		// start iteration if found more than one handlers
		handlers.length > 0 && next()

	}
}

module.exports = RequestHandler