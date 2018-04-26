/**
 * NodeJS Path module
 * @constant
 */
const path = require('path')
const { format } = require('@jp6rt/utils')
const clilogger = require('@jp6rt/cli-logger')
const splitChar = '/' 

const normalize = (routepath) => {

	// forcing windows to use forward slash
	const n = process.platform !== 'win32' ? path.normalize.bind(path) : s => s.replace(/(\\|\/)+/g, '/')

	return n(format('{0}{1}', splitChar, routepath))
}

exports.normalize = normalize

/**
 * @function
 * @param { string } routepath
 * @return { string[] } 
 */
const splitter = (routepath) => {
	let result = []
	normalize(routepath).slice(1).split(splitChar).forEach((str) => { 
		result.push(splitChar + str)
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
const validPath = (routepath) => {

	// override splitChar to always use forward slash
	// this will be the standard api usage
	const splitCharRoute = '/'

	// const logger = (require('@jp6rt/cli-logger'))('Path', !0)
	if (routepath.slice(0, 1) !== splitCharRoute && routepath.slice(0, 2) !== format('.{0}', splitCharRoute))
		return !1
	const splitted = splitter(routepath)
	let validPathCounts = 0

	for (let i=0;i<splitted.length;i++)
		valid(splitted[i]) && ++validPathCounts
	return validPathCounts === splitted.length
}

exports.validPath = validPath

const getTopParentPath = (routepath) => {
	return routepath.length === 1 ||  splitter(routepath).length === 1 ? '' : splitter(routepath)[0]
}

exports.getTopParentPath = getTopParentPath

const getFilename = (reqPath) => {
	const sp = splitter(reqPath), lastValue = sp[ sp.length - 1]
	return lastValue.split('.').length > 1 ? lastValue.slice(1, lastValue.length) : ''
}

exports.getFilename = getFilename

const removeFilename = (reqPath) => {
	const st = reqPath.replace(getFilename(reqPath), '')
	return st.slice(-1) === splitChar ? st.slice(0, st.length - 1) : st
}

exports.removeFilename = removeFilename

/**
 * 
 * @param { string } routepath 
 * @param { string } reqPath 
 * @returns { boolean }
 */
const matchPath = (routepath, reqPath) => {

	/** pass it from the filter
	// get routepath
	let routepath = routeHandler.path
	*/
	/**
	 * Logging/debugging - disable after tests are passed
	 */
	// const logger = clilogger('MatchPath', !1)

	// remove filename on the request URL
	reqPath = removeFilename(reqPath)

	// add trailing slash and normalize ('/view' matches '/view/')
	reqPath = normalize(format('{0}{1}', reqPath, splitChar))
	routepath = normalize(format('{0}{1}', routepath, splitChar))

	// split
	const reqPathSplit = splitter(reqPath)
	const routepathSplit = splitter(routepath)

	// logger.error('reqPathSplit: {0}', reqPathSplit)
	// logger.error('routepathSplit: {0}', routepathSplit)

	let index = 0
	let matchCounter = 0
	let wildcardIndex = -1
	let wildcardMatch = false

	while (!wildcardMatch && index < routepathSplit.length) {

		const cPathReq = reqPathSplit[index]
		const cPathRoute = routepathSplit[index]

		// logger.accent('cPathReq: {0}', cPathReq)
		// logger.accent('cPathRoute: {0}', cPathRoute)

		// if found a wildcard then break
		if ( cPathRoute === '/*' ) {
			// logger.silent('cPathRoute: {0} is a wildcard.', cPathRoute)
			wildcardMatch = true
			++matchCounter
			wildcardIndex = ++index // increment index by 1 to match the matchCounter
			break
		} 		

		// route parameters  always push through
		if ( isRouteParam(cPathRoute) )
			// logger.silent('cPathRoute: {0} is a route parameter.', cPathRoute), 
			++matchCounter
		
		if (cPathRoute === cPathReq)
			// logger.silent('cPathRoute: {0} is equal to cPathRoute: {1}', cPathRoute, cPathReq), 
			++matchCounter		

		// advance to next index
		++index
	}

	// logger.primary('wildcardMatch: {0}', wildcardMatch)
	// logger.primary('wildcardIndex: {0}', wildcardIndex)
	// logger.primary('matchCounter: {0}', matchCounter)
	// logger.primary('routepathSplit.length: {0}', routepathSplit.length)

	return (wildcardMatch && wildcardIndex === matchCounter) || matchCounter === routepathSplit.length
}

exports.matchPath = matchPath