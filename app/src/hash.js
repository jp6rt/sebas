/**
 * This is a temporary hash solution. 
 */

const format = require('./common').format
// const path = require('./path')
const clilogger = require('@jpart/clilogger').clilogger

const logger = clilogger('hash', !0)

/**
 * Hash the splitted path.
 * Using numeric values to have flexibility on arithmetic operations
 * @function
 * @argument { string } str
 * @returns { number }
 */
exports.hash = (str) => {
	const strLen = str.length
	logger.primary('hash strLen {0}', strLen)
	// we don't need to hash the firsr char '/'
	str = str.substr(1)
	logger.primary('hash str {0}', str)
	let hashedNum = ''
	for (const i in str)
		hashedNum = format('{0}{1}', hashedNum, (str[i]).charCodeAt())
	// bitwise operations discard bits > (2^31-1)	
	// lower the numeric value 
	hashedNum *= 1
	logger.primary('hash hashedNum {0}', hashedNum)
	return Math.round(( (~hashedNum) / strLen ) / strLen) 
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