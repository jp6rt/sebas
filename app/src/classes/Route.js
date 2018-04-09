const path = require('./path')
const common = require('./common')
const sebas = require('./sebas')

/**
 * @class
 */
const Route = class {
	/**
	 * @constructor
	 * @param { string } method
	 * @param { string } routepath
	 * @param { function } handler 
	 */
	constructor(method, routepath, handler){
		this.parentPath = routepath
		this.method = method
		if (typeof handler === 'function') {
			sebas.insertHandler(method, routepath, handler)
		}
	}

	/**
	 * @method
	 * Overload function that takes (routepath, handler) | (handler)
	 */
	pipe() {
		const arg0 = arguments[0]
		const arg1 = arguments[1]

		// Handler for arguments (routepath, handler)
		if (typeof arg0 === 'string') {
			// guard the path if not valid
			if (!path.validPath(arg0) || !path.validPath(arg0.slice(0, 1)))
				throw new Error(common.format('The path ({0}) you provided is not valid', arg0))

			const routepath = arg0.slice(0, 1) == '.' && path.validPath(arg0.slice(0, 1)) 
				? path.normalize(common.format('{0}/{1}', this.parentPath, arg0.slice(0, 1))) 
				: (path.validPath(arg0) ? arg0 : void 0)
			routepath && typeof arg1 === 'function' && sebas.insertHandler(this.method, routepath, arg1)
		}		
		
		// Handler for arguments (handler)
		if (typeof arg0 === 'function') {
			sebas.insertHandler(this.method, this.parentPath, arg0)
		}
	}
}

module.exports = Route