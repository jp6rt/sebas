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
	const validPathRgx = /\/:?[a-zA-Z0-9]+/
	return routepath.match(validPathRgx)
}

exports.valid = valid

/**
 * Used for combined path
 * Validates the given path and returns a boolean => !0 for valid, 01 for invalid
 * @function
 * @param { string } routepath
 * @returns { boolean } 
 */
exports.validPath = (routepath) => {
	const splitted = splitter(routepath)
	let validPathCounts = 0

	for (let i=0;i<splitted.length;i++)
		valid(splitted[i]) && ++validPathCounts
	return validPathCounts === splitted.length
}
