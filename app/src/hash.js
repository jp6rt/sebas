const format = require('./common').format

/**
 * Hash the splitted path.
 * Using numeric values to have flexibility on arithmetic operations
 * @function
 * @argument { string } str
 * @returns { number }
 */
 exports.hash = (str) => {
	let hashedNum = ''
	for (let i=0; i<str.length; i++)
		hashedNum = format('{0}{1}', hashedNum, (str[i]).charCodeAt())
	return ~ ( hashedNum * 1 )
}

 /**
 * Hash the whole path
 * uses hash function (local)
 * @function
 * @argument { string } path
 * @returns { any }
 */
 exports.hashPath = (path) => {
	
}