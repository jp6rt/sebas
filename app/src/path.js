/**
 * @function
 * @param { string } path
 * @return { string[] } 
 */
exports.splitter = (path) => {
	let result = []
	path.slice(1).split('/').forEach((str) => { 
		result.push('/' + str)
	})
	return result
}

/**
 * @function
 * @param { string } path
 * @returns { boolean } 
 */
exports.valid = (path) => {
	const validPath = /\/:?[a-zA-Z0-9]+/
	const splitted = path.splitter(path)
	let validPathCounts = 0

	for (let i=0;i<splitted.length;i++)
		splitted[i].match(validPath) && ++validPathCounts

	return validPathCounts === splitted.length
}
