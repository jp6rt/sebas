const rxjs = require('rxjs')

/**
 * Starts the sebas server
 * @function
 * @param {Config} config - configuration object
 * @returns { Observable }
 * @fires SebasStarted
 */
exports.start = (config) => {
	return rxjs.Observable.create((observer) => {
		
	})
}

/**
 * Stops the sebas server
 * @function
 * @returns { Observable }
 *  @fires SebasStopped
 */
exports.stop = () => {
	return rxjs.Observable.create((observer) => {
		
	})
}

/**
 * Handles 'all'  requests
 * all (Handler)
 * @function
 * @param {string | PathHandler} path | Function
 * @param {PathHandler} Function
 * @returns { RouteHandler }
 */
exports.all = () => {
	return void 0
}

/**
 * Handles GET requests
 * get (Handler)
 * @function
 * @param {string | PathHandler} path | Function
 * @param {PathHandler} Function
 * @returns { RouteHandler }
 */
exports.get = () => {
	return void 0
}

/**
 * Handles POST requests
 * post (Handler)
 * @function
 * @param {string | PathHandler} path | Function
 * @param {PathHandler} Function
 * @returns { RouteHandler }
 */
exports.post = () => {
	return void 0
}

/**
 * Handlers PUT requests
 * put (Handler)
 * @function
 * @param {string | PathHandler} path | Function
 * @param {PathHandler} Function
 * @returns { RouteHandler }
 */
exports.put = () => {
	return void 0
}

/**
 * Handles DELETE requests
 * delete (Handler)
 * @function
 * @param {string | PathHandler} path | Function
 * @param {PathHandler} Function
 * @returns { RouteHandler }
 */
exports.delete = () => {
	return void 0
}

/**
Removed options handler. All option handlers should be preloaded
*/

/**
 * Handle static files
 * @function
 * @param { string } dir
 * @param { ResponseHeaders } responseHeaders
 * @param { string } fallback
 * @returns { RouteHandler }
 */
exports.static = (dir, responseHeaders, fallback) => {
	return void 0
}