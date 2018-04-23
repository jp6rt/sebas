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
