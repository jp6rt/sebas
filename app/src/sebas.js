const hashpath = require('./hash').hashpath
const METHOD_CONST = require('./methods').METHOD_CONST
const format = require('./common').format

/**
 * Class for Sebas
 */
const Sebas = class {
	constructor() {
		/**
		 * @property { Map<string, function[]> } pathHandlers
		 */
		this.pathHandlers = new Map
	}
	/**
	 * @method
	 * @param { Config } config
	 * @returns { Observable }
	 */
	start(config) {

	}
	/**
	 * @method
	 * @returns { Observable }
	 */
	stop() {

	}
	/**
	 * @method
	 */
	addHandler(method, routepath, handler) {
		const hashed = hashpath(routepath)
	}
}

/**
 * @global
 * sebas global object
 */
const sebas = process.sebas instanceof Sebas || new Sebas()
process.sebas = sebas
exports = sebas