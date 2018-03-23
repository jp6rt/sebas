/**
 * Use a simple DIY hash but resolve conflicts on hash map build
 * This hash function should yield the same result for the same input 
 */

const common = require('./common')
const random = common.random
const format = common.format
const partitionString = common.partitionString
// const path = require('./path')
const clilogger = require('@jpart/clilogger').clilogger
const logger = clilogger('hash', !0)
const hexChars = common.hexChars
const hexrandom = common.hexrandom

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
 * hashed paths stored on a map to avoid re-hashing paths on runtime
 */
let hashedPaths = new Map

/**
 * Hash the splitted path.
 * @function
 * @argument { string } str
 * @returns { string }
 */	
exports.hash = (str) => {
	let hashed = ''
	// we don't need to hash the firsr char '/'
	str = str.substr(1)
	// pull from hashedPaths store
	let memhashed = hashedPaths.get(str) 
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

	// cache all hashed
	hashedPaths.set(str, hashed)
	return hashed
}

/**
* Hash the whole path
* uses hash function (local)
* @function
* @argument { string } path
* @returns { number }
*/
exports.hashpath = (path) => {
		
}