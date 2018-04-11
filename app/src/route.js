const { validPath, normalize } = require('./path')
const { format } = require('./common')
const Route = require('./classes/Route')

/**
 * @function
 * @param { string } method
 * @param { string } routepath 
 * @param { function } handler
 * @returns { Route } 
 */
exports.route = (method, routepath, handler) => {
	if (!validPath(routepath))
		throw new Error(format('The path \'{0}\' you provided is not valid', routepath))
	routepath = normalize(routepath)
	return new Route(routepath, handler)
}
