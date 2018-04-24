const { getTopParentPath } = require('../path')
const { routeParamScheme } = require('../routeparam')

/**
 * @class
 * RouteHandler constructor
 */
const RouteHandler = class {
	/**
	 * 
	 * @param { string } routepath 
	 * @param { number } index 
	 * @param { function } handler 
	 */
	constructor(routepath, index, handler) {
		/**
		 * @property
		 * handlerIndex stores the position of the handler on the order
		 */
		this.handlerIndex = index
		/**
		 * @property
		 * handler stores the route handler
		 */
		this.handler = handler
		/**
		 * @property
		 */
		this.topParentPath = getTopParentPath(routepath)
		/**
		 * @property
		 */
		this.path = routepath
		/**
		 * @property
		this.routeParamScheme = routeParamScheme(routepath)
		*/
	}
}

module.exports = RouteHandler