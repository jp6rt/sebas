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
		this.pathHandlers = {}
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
		// add a key-value store for each methods? - yes
		// calculate path possibility
		// auto insert new options handler
		const hashed = hashpath(routepath), sym = Symbol.for(hashed)
		if (!this.pathHandlers[sym])
			this.pathHandlers[sym] = new Array
		this.pathHandlers[sym].unshift(handler)
	}
}

/**
 * @global
 * sebas global object
 */
const sebas = process.sebas instanceof Sebas || new Sebas()
process.sebas = sebas
exports = sebas