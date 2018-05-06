const { splitter, isRouteParam } = require('./path')

const getParamName = (rPath) => {
	return isRouteParam(rPath) ? rPath.substring(2) : ''
}

exports.getParamName = getParamName

const routeParamScheme = (routepath) => {
	let routeParams = []
	const routepathSplit = splitter(routepath)

	for (const i in routepathSplit) {
		const rPath = routepathSplit[i]
		if (isRouteParam(rPath))
			routeParams.push({
				routeIndex: i * 1, // seems this is treated as string, cast (n * 1)
				routeParam: getParamName(rPath)
			})
	}

	return routeParams
}

exports.routeParamScheme = routeParamScheme

// We are calling this function on each handler iteration.
// we need to memoize the results so we don't have the run extraction code
const _mem_RouteParams = {}

const extractRouteParamsFromCache = (reqPath, routepath) => {
	return (_mem_RouteParams.hasOwnProperty(reqPath) 
		&& _mem_RouteParams[reqPath].hasOwnProperty(routepath))
		?  _mem_RouteParams[reqPath][routepath] : null
}

const extractRouteParams = (reqPath, routepath) => {
	const reqPathSplit = splitter(reqPath)
	const rpScheme = routeParamScheme(routepath)
	const routeParams = {}

	// fetch from cache
	const cached = extractRouteParamsFromCache(reqPath, routepath)

	if (cached)
		return cached 

	for(const p in rpScheme) {

		const n = rpScheme[p].routeParam
		const i = rpScheme[p].routeIndex

		routeParams[ n ] = reqPathSplit[ i ].substring(1) // result is prefixed with a /, only get teh value on position 1 onwards
	}

	// cache result
	!_mem_RouteParams.hasOwnProperty(reqPath) && (_mem_RouteParams[ reqPath ] = {})
	_mem_RouteParams[ reqPath ] [ routepath ] = routeParams

	return routeParams
}

exports.extractRouteParams = extractRouteParams