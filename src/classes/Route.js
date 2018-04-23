const { validPath, normalize } = require('../path')
const { format } = require('@jp6rt/utils')
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
		// move sebas inside the Route constructor
		// we referenced the Route class on the Sebas code so it will return {} if sebas is called from the top document
		// this.sebas = require('../sebas')
		// removed, changed to process.sebas instead

		this.parentPath = routepath
		this.method = method
		if (typeof handler === 'function') {
			this.sebas.insertHandler(method, routepath, handler)
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
			if (!validPath(arg0) || !validPath(arg0.slice(1, arg0.length)))
				throw new Error(format('The path ({0}) you provided is not valid', arg0))

			const routepath = arg0.slice(0, 1) == '.' && validPath(arg0.slice(1, arg0.length)) 
				? normalize(format('{0}/{1}', this.parentPath, arg0.slice(1, arg0.length))) 
				: (validPath(arg0) ? arg0 : void 0)
			routepath && typeof arg1 === 'function' && process.sebas.insertHandler(this.method, routepath, arg1)
		}		
		
		// Handler for arguments (handler)
		if (typeof arg0 === 'function') {
			process.sebas.insertHandler(this.method, this.parentPath, arg0)
		}
		return this
	}
}

module.exports = Route