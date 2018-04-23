/**
 * NodeJS Path module
 * @constant
 */
const path = require('path')

const { format } = require('@jp6rt/utils')

/**
 * @function
 * @param { string } routepath
 * @return { string[] } 
 */
const splitter = (routepath) => {
	let result = []
	routepath.slice(1).split('/').forEach((str) => { 
		result.push('/' + str)
	})
	return result
}

exports.splitter = splitter

/**
 * Used for splitted path
 * Validates the given path and returns a boolean => !0 for valid, 01 for invalid
 * @function
 * @param { string } routepath 
 * @returns { boolean }
 */
const valid = (routepath) => {
	const validPathRgx = /^\/:?[a-zA-Z0-9]*/
	return !!routepath.match(validPathRgx)
}

exports.valid = valid

/**
 * @function
 * @param { string } routepath 
 * @returns { boolean }
 */
const isRouteParam = (routepath) => {
	const routeParamRgx = /^\/:[a-zA-Z0-9]+/
	return !!routepath.match(routeParamRgx)
}

exports.isRouteParam = isRouteParam

/**
 * Used for combined path
 * Validates the given path and returns a boolean => !0 for valid, 01 for invalid
 * @function
 * @param { string } routepath
 * @returns { boolean } 
 */
exports.validPath = (routepath) => {

	if (routepath.slice(0, 1) !== '/' && routepath.slice(0, 2) !== './')
		return !1

	const splitted = splitter(routepath)
	let validPathCounts = 0

	for (let i=0;i<splitted.length;i++)
		valid(splitted[i]) && ++validPathCounts
	return validPathCounts === splitted.length
}

exports.normalize = (routepath) => {
	return path.normalize(format('{0}{1}', '/', routepath))
}
