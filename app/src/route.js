const path = require('./path')
const common = require('./common')
const RouteHandler = require('./RouteHandler')

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
