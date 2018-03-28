/**
 * Use a simple DIY hash but resolve conflicts on hash map build
 * This hash function should yield the same result for the same input 
 */

const common = require('./common')
const clilogger = require('@jpart/clilogger').clilogger
const path = require('./path')

const random = common.random
const format = common.format
const partitionString = common.partitionString
const hexChars = common.hexChars
const hexrandom = common.hexrandom
const logger = clilogger('hash', !1)
const splitter = path.splitter

/**
 * HashedStore - hashed paths stored on a map to avoid re-hashing paths on runtime
 */
function HashedStore(){
	this.hashedPaths = new Map
	this.hashedPathsReversed = new Map
}

/**
 * store the hash path
 * @function
 * @param { string } routepath 
 * @param { string } hashed 
 */
HashedStore.prototype.set = function(routepath, hashed) {
	this.hashedPaths.set(routepath, hashed)
	this.hashedPathsReversed.set(hashed, routepath)
}

/**
 * retrives the hash for a path
 * @function
 * @param { string } routepath 
 * @returns { string }
 */
HashedStore.prototype.get = function(routepath) {
	return this.hashedPaths.get(routepath)
}

/**
 * retrieves the path for a specific hash
 * @function
 * @param { string } hashed 
 * @returns { string }
 */
HashedStore.prototype.getPath = function(hashed) {
	return this.hashedPathsReversed.get(hashed)
}

/**
 * hashedStore instance
 */
const hashedStore = new HashedStore

/**
 * This function aims to reduced the hashed path
 * partitioned has by length=1 and removes the 2 chars in between
 * @function
 * @param { string } hashed
 * @returns { string } 
 */
const hashreduce = (hashed) => {
	if (hashed.length < 4)
		return hashed
	const partitioned = partitionString(hashed, 4)
	let reduced = []
	for (let i in partitioned) {
		const p = partitioned[i]
		p.length >= 4 ? reduced.push(format('{0}{1}', p.substr(0,1), p.substr(3))) : reduced.push(p)
	}
	return reduced.toString().replace(/,/g, '')
}

// exporting hashreduce for testing
exports.hashreduce = hashreduce

/**
 * Hash the splitted path.
 * @function
 * @argument { string } str
 * @returns { string }
 */	
const hash = (str) => {
	let hashed = ''
	// we don't need to hash the firsr char '/'
	str = str.substr(1)
	// pull from hashedPaths store
	let memhashed = hashedStore.get(str) 
	if (memhashed) {
		logger.primary('Using cached hash input: {0}, memhashed: {1}', str, memhashed)
		return memhashed
	}	

	for (const i in str) {
		const num = (str[i]).charCodeAt() * random() 
		hashed = format('{0}{1}', hashed, hexChars[ num%16 ] )
	}		
	hashed = hashreduce(hashed)	

	// populate hashed if the result length < 5
	// this may reduce possible conflicts
	while (hashed.length < 5) {
		hashed = format('{0}{1}', hashed, hexrandom())
	}

	// resolve conflicts
	// we check if the hashed value already exist on the store 
	// and make sure that it is not already assigned to another path
	if ( hashedStore.getPath(hashed) &&  hashedStore.getPath(hashed) !== str ) {
		// rehash
		// the random value should do the trick
		hashed = hash(str)
	}

	// cache all hashed
	hashedStore.set(str, hashed)
	return hashed
}

exports.hash = hash

/**
* Hash the whole path
* uses hash function (local)
* @function
* @argument { string } path
* @returns { number }
*/
exports.hashpath = (routepath) => {
	const splitted = splitter(routepath)
	let hashedPath = ''
	if (splitted.length === 1) {
		return hash(splitted[0])
	}
	splitted.forEach((v) => {
		// we use the character z as path divider z := /
		let hashed
		// we need to use different hash for route parameter e.g., :param
		if (v !== '/') 
			hashed = hash(v)
		else hashed = 'z'
		// only use divider if hashedPath and hashed is already populated (hashedPath !== '' && hashed !== 'z')
		hashedPath = format('{0}{1}{2}', hashedPath,  hashedPath !== '' && hashed !== 'z' ? 'z' : '', hashed)
	})
	return hashedPath
}
