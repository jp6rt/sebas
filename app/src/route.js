const path = require('./path')
const common = require('./common')
const sebas = require('./sebas')

/**
 * @class
 * @param { string } routepath
 * @param { function } handler 
 */
function RouteHandler(method, routepath, handler){
	this.parentPath = routepath
	this.method = method
	if (typeof handler === 'function') {
		sebas.addHandler(method, routepath, handler)
	}
}

/**
 * @function
 * Overload function that takes (routepath, handler) | (handler)
 */
RouteHandler.prototype.pipe = function() {
	const arg0 = arguments[0]
	const arg1 = arguments[1]

	if (typeof arg0 === 'string') {		
		const routepath = arg0.slice(0, 1) == '.' && path.validPath(arg0.slice(0, 1)) 
			? path.normalize(common.format('{0}/{1}', this.parentPath, arg0.slice(0, 1))) 
			: (path.validPath(arg0) ? arg0 : void 0)
		routepath && typeof arg1 === 'function' && sebas.addHandler(this.method, routepath, arg1)
	}		
	
	if (typeof arg0 === 'function') {
		sebas.addHandler(this.method, this.parentPath, arg0)
	}
}

/**
 * @function
 * @param { string } method
 * @param { string } routepath 
 * @param { function } handler
 * @returns { RouteHandler } 
 */
exports.route = (method, routepath, handler) => {
	if (!path.validPath(routepath))
		throw new Error(common.format('The path ({0}) you provided is not valid', routepath))
	routepath = path.normalize(routepath)
	return new RouteHandler(routepath, handler)
}

/**
 * export this class for testing only
 */
exports.RouteHandler = RouteHandler
