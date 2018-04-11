/**
 * Use a simple DIY hash but resolve conflicts on hash map build
 * This hash function should yield the same result for the same input 
 */

const { random, format, partitionString, hexChars, hexrandom } = require('./common')
const { clilogger } = require('@jpart/clilogger')
const { splitter, isRouteParam } = require('./path')
const HashedStore = require('./classes/HashedStore')
const PATH_CONST_CHARS = require('./enums/path_const_chars')
const logger = clilogger('hash', !1)

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
	if (hashed.length < 5)
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

	// check if it is a route parameter and return the PARAM constant
	if (isRouteParam(str)) {
		return PATH_CONST_CHARS.PARAM
	}
	// we don't need to hash the firsr char '/'
	str = str.substr(1)
	// pull from hashedPaths store
	let memhashed = hashedStore.retrieve(str) 
	if (memhashed) {
		logger.primary('Using cached hash input: {0}, memhashed: {1}', str, memhashed)
		return memhashed
	}	
	let hashed = ''
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
	hashedStore.store(str, hashed)
	return hashed
}

exports.hash = hash

/**
* Hash the whole path
* uses hash function (local)
* @function
* @argument { string } routepath
* @returns { number }
*/
exports.hashpath = (routepath) => {
	const splitted = splitter(routepath)
	let hashedPath = ''
	if (splitted.length === 1) {
		return hash(splitted[0])
	}
	splitted.forEach((v) => {		
		let hashed
		if (v === '/')
			hashed = PATH_CONST_CHARS.DIV
		else 
			hashed = hash(v)
		// only use divider if hashedPath and hashed is already populated (hashedPath !== '' && hashed !== 'z')
		hashedPath = format('{0}{1}{2}', hashedPath,  hashedPath !== '' && hashed !== PATH_CONST_CHARS.DIV ? PATH_CONST_CHARS.DIV  : '', hashed)
	})
	return hashedPath
}
