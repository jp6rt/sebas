const hexChars = '0\'1\'2\'3\'4\'5\'6\'7\'8\'9\'a\'b\'c\'d\'e\'f'.split('\'')
exports.hexChars = hexChars

/**
 * Formats a string e.g., format(foo+{0}, bar) => foo+bar
 * @function
 * @argument { any[] } any
 * @returns string
 */
exports.format = function(){
	let msg, params
	(typeof arguments[0] === 'object') ? (msg = arguments[0][0], params = arguments[0]) : (msg = arguments[0], params = arguments)
	msg = msg.replace(/{\d}/g, (s) => {
		const key = (1 * s.match(/\d/)[0]) + 1
		return typeof params[key] !== 'undefined' ? params[key] : s
	})
	return msg
}
/**
 * Returns a random number from 1-10
 * @function
 * @returns number
 */
exports.random = () => {
	const rand = (Math.random() + '').substr(2) * 1
	return (rand % 9) + 1
}

/**
 * returns a random hex value from 0-f
 * @function
 * @returns char
 */
exports.hexrandom = () => {
	const rand = (Math.random() + '').substr(2) * 1
	return hexChars[ (rand % 15) + 1 ]
}

/**
 * Partitions a string and returns an array
 * @function
 * @argument { string } inputStr
 * @argument { number } partition
 * @returns { string[] }
 */
exports.partitionString = (inputStr, partition) => {
	const strLen = inputStr.length
	if ( strLen <= partition )
		return [ inputStr ]
	let partitioned = [], currentKey = 0
	
	while (currentKey < strLen) {
		partitioned.push(inputStr.slice(currentKey, partition + currentKey))
		currentKey += partition
	}
	return partitioned
}