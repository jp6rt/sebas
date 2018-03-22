const path = require('./path')
const common = require('./common')

/**
 * @class
 * @param { string } path
 * @param { function } handler 
 */
function RouteHandler(path, handler){
	this.parentPath = path
	if (typeof handler === 'function') {
		//
	}
}

/**
 * @function
 * @param { string } path
 * @param { function } handler
 */
RouteHandler.prototype.pipe = function(path, handler){
	// path guard
	if (!path.valid(path))
		throw new Error(common.format('The path ({0}) you provided is not valid', path))
}

/**
 * @function
 * @param { string } path 
 * @param { function } handler
 * @returns { RouteHandler } 
 */
exports.route = (path, handler) => {
	// path guard
	if (!path.valid(path))
		throw new Error(common.format('The path ({0}) you provided is not valid', path))
	return new RouteHandler(path, handler)
}

/**
 * export this class for testing only
 */
exports.RouteHandler = RouteHandler