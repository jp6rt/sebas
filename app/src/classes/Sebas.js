const hashpath = require('../hash').hashpath
const METHOD_CONST = require('../methods').METHOD_CONST
const format = require('../common').format
const HandlersStore = require('./HandlersStore')

/**
 * Class for Sebas
 */
const Sebas = class {
	constructor() {
		/**
		 * @property { Map<string, function[]> } handlerStore
		 */
		this.handlersStore = new HandlersStore
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
	insertHandler(method, routepath, handler) {
		this.handlersStore.insertHandler(method, hashpath(routepath), handler)
	}	
}

module.exports = Sebas