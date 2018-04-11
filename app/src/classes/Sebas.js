const { hashpath } = require('../hash')
const { METHOD_CONST } = require('../methods')
const { format } = require('../common')
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
		return new Promise((resolve, reject) => {
			
		})
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