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