const path = require('./path')
const common = require('./common')
const npath = require('path')

/**
 * @class
 * @param { string } routepath
 * @param { function } handler 
 */
function RouteHandler(routepath, handler){
	this.parentPath = path
	if (typeof handler === 'function') {
		//
	}
}

/**
 * @function
 * @param { string } routepath
 * @param { function } handler
 */
RouteHandler.prototype.pipe = function(routepath, handler){
	// path guard
	if (!path.validPath(path))
		throw new Error(common.format('The path ({0}) you provided is not valid', path))
}

/**
 * @function
 * @param { string } routepath 
 * @param { function } handler
 * @returns { RouteHandler } 
 */
exports.route = (routepath, handler) => {
	// use path normalize
	// path guard
	if (!path.validPath(routepath))
		throw new Error(common.format('The path ({0}) you provided is not valid', routepath))
	return new RouteHandler(routepath, handler)
}

/**
 * export this class for testing only
 */
exports.RouteHandler = RouteHandler